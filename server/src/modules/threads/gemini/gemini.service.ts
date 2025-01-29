import { Inject, Injectable, Logger } from '@nestjs/common';
import { ICharacter } from '../../characters/types/character.type';
import { GenerativeModel } from '@google/generative-ai';
import { GEMINI_MODEL } from './gemini.provider';
import { promises as fs } from 'fs';
import { join } from 'path';
import { GeminiException } from 'src/common/exceptions/gemini.exception';
import { Post } from '../types/thread.types';
import { FormatterService } from './formatter.service';
import { PromptService } from './prompt.service';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
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
      // this.logger.debug('formatted initial post:', initialThread);

      for (let i = 0; i < initialThread.length; i++) {
        const reaction = await this.reactToPost(
          initialThread[i],
          characters[0],
          characters[1],
        );
        finalThread.push(reaction);
      }
      this.logger.debug('Final thread', finalThread);
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
    const prompt = this.promptService.createReactionPrompt(
      post,
      originalCharacter,
      reactingCharacter,
    );
    const output = await this.model.generateContent(prompt);
    const response = output.response;
    const text = response.text();
    const formattedResponse = this.formatter.formatReaction(
      text,
      post,
      reactingCharacter,
    );
    return formattedResponse;
  }

  /**
   * Some functions used for tests. These avoid making calls to the Gemini API
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
      const formattedContent = this.formatter.formatReaction(
        sampleContent,
        samplePost,
        reactingCharacter,
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
