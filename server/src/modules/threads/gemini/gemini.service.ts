import { Inject, Injectable, Logger } from '@nestjs/common';
import { ICharacter } from '../../characters/types/character.type';
import { GenerativeModel, UsageMetadata } from '@google/generative-ai';
import { GEMINI_MODEL } from './gemini.provider';
import { promises as fs } from 'fs';
import { join } from 'path';
import { GeminiException } from 'src/common/exceptions/gemini.exception';
import { Post, Reaction } from '../types/thread.types';
import { FormatterService } from './formatter.service';
import { PromptService } from './prompt.service';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private totalPromptTokenCount = 0;
  private totalOutputTokenCount = 0;
  private threadTokenCount = 0;
  private totalTokensPerSession = [];
  constructor(
    @Inject(GEMINI_MODEL) private readonly model: GenerativeModel,
    private readonly formatter: FormatterService,
    private readonly promptService: PromptService,
  ) {}
  async generateThread(topic: string, characters: ICharacter[]) {
    try {
      const finalThread: Post[] = [];
      const initialThread = await this.createInitialThread(
        topic,
        characters[0],
      );
      for (let i = 0; i < initialThread.length; i++) {
        const reaction = await this.reactToPost(
          initialThread[i],
          characters[0],
          characters[1],
        );
        finalThread.push(reaction);
      }
      this.logger.debug('Final thread', finalThread);
      this.displayTokenCount();
      this.storeSessionTokens(this.threadTokenCount);
      this.displaySessionTokenCount();
    } catch (error) {
      this.logger.error(`Failed to generat thread: ${error.message}`);
      throw new GeminiException('Failed to generate thread content');
    }
  }

  private async createInitialThread(
    topic: string,
    character: ICharacter,
  ): Promise<Post[]> {
    try {
      const prompt = this.promptService.createInitialThreadPrompt(
        topic,
        character,
      );
      const output = await this.model.generateContent(prompt);
      const response = output.response;
      this.countTokens(response.usageMetadata);
      const text = response.text();
      const formattedText = this.formatter.formatInitialThread(
        text,
        character.name,
      );
      return formattedText;
    } catch (error) {
      this.logger.error(`Failed to create initial post: ${error.message}`);
      throw new GeminiException('Failed to create initial post');
    }
  }

  private async reactToPost(
    post: Post,
    originalCharacter: ICharacter,
    reactingCharacter: ICharacter,
  ): Promise<Post> {
    // Generates the output from the prompt
    const prompt = this.promptService.createReactionPrompt(
      post,
      originalCharacter,
      reactingCharacter,
    );
    const output = await this.model.generateContent(prompt);
    const response = output.response;

    // Adds tokens used on each reaction to the total
    this.countTokens(response.usageMetadata);
    const text = response.text();
    // Formats reaction into JSON
    const formattedResponse: Reaction = this.formatter.formatReaction(
      text,
      reactingCharacter.name,
    );

    // Updates the post with the reaction data
    const updatedPost = this.formatter.asyncAddLikesAndShares(
      formattedResponse,
      post,
    );
    updatedPost.reaction.push(
      formattedResponse.author,
      formattedResponse.reaction,
    );
    return updatedPost;
  }

  private countTokens(response: UsageMetadata): void {
    this.totalPromptTokenCount += response.promptTokenCount;
    this.totalOutputTokenCount += response.candidatesTokenCount;
    this.threadTokenCount += response.totalTokenCount;
  }

  private displayTokenCount() {
    this.logger.debug(
      `Total prompt token count: ${this.totalPromptTokenCount}
       Total output token count: ${this.totalOutputTokenCount}
       Total token count from thread generation: ${this.threadTokenCount}
      `,
    );
  }

  private displaySessionTokenCount() {
    const totalTokens = this.totalTokensPerSession.reduce(
      (acc, curr) => acc + curr,
      0,
    );
    this.logger.debug(
      `Token count from each thread: ${this.totalTokensPerSession.join(', ')}
       Total token count from this session: ${totalTokens}
      `,
    );
  }

  private storeSessionTokens(tokens: number): void {
    this.totalTokensPerSession.push(this.threadTokenCount);
    this.totalPromptTokenCount = 0;
    this.totalOutputTokenCount = 0;
    this.threadTokenCount = 0;
  }
  /**
   * Some functions used for tests. These avoid making calls to the Gemini API.
   */
  //#region
  private async testCreateInitialThread(): Promise<Post[]> {
    try {
      const projectRoot = process.cwd();
      const samplePath = join(
        projectRoot,
        'src',
        'modules',
        'threads',
        'gemini',
        'samples',
        'initial-thread.txt',
      );
      const sampleContent = await fs.readFile(samplePath, 'utf-8');
      const formattedContent = this.formatter.formatInitialThread(
        sampleContent,
        'Luke Skywalker',
      );
      return formattedContent;
    } catch (error) {
      console.error('Error reading sample file:', error);
      throw error;
    }
  }

  private async testReactToPost(
    samplePost: Post,
    originalCharacter: ICharacter,
    reactingCharacter: ICharacter,
  ) {
    try {
      const projectRoot = process.cwd();
      const samplePath = join(
        projectRoot,
        'src',
        'modules',
        'threads',
        'gemini',
        'samples',
        'reaction.txt',
      );
      const sampleContent = await fs.readFile(samplePath, 'utf-8');
      // TODO: check if this still works after alterations to formatReaction
      const formattedContent = this.formatter.formatReaction(
        sampleContent,
        reactingCharacter.name,
      );
      return formattedContent;
    } catch (error) {
      console.error('Error reading sample file:', error);
      throw error;
    }
  }

  private async toJsonSampleInitialThread(): Promise<Post[]> {
    const projectRoot = process.cwd();
    const samplePath = join(
      projectRoot,
      'src',
      'modules',
      'threads',
      'gemini',
      'samples',
      'formatted-initial-thread.txt',
    );
    const sampleFormattedThread = await fs.readFile(samplePath, 'utf-8');
    const jsonThread: Post[] = JSON.parse(sampleFormattedThread);
    return jsonThread;
  }
  //#endregion
}
