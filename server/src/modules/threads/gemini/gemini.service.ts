import { Inject, Injectable, Logger } from '@nestjs/common';
import { ICharacter } from '../../characters/types/character.type';
import { GenerativeModel } from '@google/generative-ai';
import { GEMINI_MODEL } from './gemini.provider';
import { Post, Reaction } from '../types/thread.types';
import { FormatterService } from './formatter.service';
import { PromptService } from './prompt.service';
import { TokensService } from './tokens.service';
import { GeminiErrorHandler } from './exceptions/gemini.error.handler';
import {
  GeminiBaseException,
  ThreadGenerationException,
} from './exceptions/gemini.exceptions';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  constructor(
    @Inject(GEMINI_MODEL) private readonly model: GenerativeModel,
    private readonly formatter: FormatterService,
    private readonly promptService: PromptService,
    private readonly tokensService: TokensService,
    private readonly errorHandler: GeminiErrorHandler,
  ) {}
  async generateThread(topic: string, characters: ICharacter[]) {
    try {
      const initialThread = await this.createInitialThread(
        topic,
        characters[0],
      );
      const finalThread = await this.generateReactions(
        initialThread,
        characters,
      );
      this.logger.debug('Final thread', finalThread);
      this.handleTokens();
    } catch (error) {
      this.errorHandler.handleGeminiError(error, 'Generate thread');
      // this.logger.error(`Failed to generat thread: ${error.message}`);
      // if (error instanceof GeminiBaseException) {
      //   throw error;
      // } else {
      //   throw new ThreadGenerationException(
      //     'Failed to generate thread content',
      //   );
      // }
    }
  }

  private async generateReactions(
    thread: Post[],
    characters: ICharacter[],
  ): Promise<Post[]> {
    const finalThread: Post[] = [];
    for (let i = 0; i < thread.length; i++) {
      for (let j = 1; j < characters.length; j++) {
        const reaction = await this.reactToPost(
          thread[i],
          characters[0],
          characters[j],
        );

        if (reaction) {
          thread[i].reaction.push({
            author: reaction.author,
            reaction: reaction.reaction,
          });
        }
      }
      finalThread.push(thread[i]);
    }

    return finalThread;
  }

  private async createInitialThread(
    topic: string,
    character: ICharacter,
  ): Promise<Post[]> {
    const prompt = this.promptService.createInitialThreadPrompt(
      topic,
      character,
    );
    const output = await this.model.generateContent(prompt);
    const response = output.response;
    this.tokensService.countTokens(response.usageMetadata);
    const text = response.text();
    const formattedText = this.formatter.formatInitialThread(text, character);
    return formattedText;
  }

  private async reactToPost(
    post: Post,
    originalCharacter: ICharacter,
    reactingCharacter: ICharacter,
  ): Promise<Reaction> {
    // Generates the output from the prompt
    const prompt = this.promptService.createReactionPrompt(
      post,
      originalCharacter,
      reactingCharacter,
    );
    const output = await this.model.generateContent(prompt);
    const response = output.response;

    // Adds tokens used on each reaction to the total
    this.tokensService.countTokens(response.usageMetadata);
    const text = response.text();
    // Formats reaction into JSON
    const formattedResponse = this.formatter.formatReaction(
      text,
      reactingCharacter,
    );

    // Updates the post with the reaction data
    if (formattedResponse) {
      this.formatter.addLikesAndShares(formattedResponse, post);
    }
    return formattedResponse;
  }

  private handleTokens(): void {
    this.tokensService.displayTokenCount();
    this.tokensService.storeSessionTokens();
    this.tokensService.displaySessionTokenCount();
  }

  /**
   * Some functions used for tests. These avoid making calls to the Gemini API.

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
  */
}
