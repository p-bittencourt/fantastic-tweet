import { Inject, Injectable, Logger } from '@nestjs/common';
import { ICharacter } from '../../characters/types/character.type';
import { GenerativeModel } from '@google/generative-ai';
import { GEMINI_MODEL } from './gemini.provider';
import { promises as fs } from 'fs';
import { join } from 'path';
import { GeminiException } from 'src/common/exceptions/gemini.exception';

export interface Reaction {
  author: string;
  reaction: string;
  like: string;
  share: string;
}

export interface Post {
  author: string;
  content: string;
  likes: number;
  shares: number;
  reaction: string[];
}

export interface Thread {
  post1: Post;
  post2: Post;
  post3?: Post;
  post4?: Post;
}

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  constructor(@Inject(GEMINI_MODEL) private readonly model: GenerativeModel) {}
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
      const prompt = `
      You are ${character.name} from ${character.universe}.
      Personality traits: ${character.traits.join(',')}.
          Write a Twitter/X thread (2-3 connected posts) about ${topic}
      Each post should be under 280 characters.
      Maintain your character's unique perspective and speaking style.
      Include appropriate hashtags if they fit your character's style.
          Important:
      - Stay true to the character's known beliefs and values
      - Write in a conversational, social media friendly tone
      - Reference events or knowledge that would make sense for your character
      - Don't break character or reference being an AI
          Format your response as JSON:
      {
        "post1": string,
        "post2": string,
        ...
      }
    `;
      const output = await this.model.generateContent(prompt);
      const response = output.response;
      const text = response.text();
      const formattedText = this.formatInitialThread(text, character.name);
      return formattedText;
    } catch (error) {
      this.logger.error(`Failed to create initial post: ${error.message}`);
      throw new GeminiException('Failed to create initial post');
    }
  }

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
      const formattedContent = this.formatInitialThread(
        sampleContent,
        'Luke Skywalker',
      );
      return formattedContent;
    } catch (error) {
      console.error('Error reading sample file:', error);
      throw error;
    }
  }

  private async reactToPost(
    post: Post,
    originalCharacter: ICharacter,
    reactingCharacter: ICharacter,
  ): Promise<Post> {
    const prompt = `
      You are ${reactingCharacter.name} from ${reactingCharacter.universe}.
      Personality traits: ${reactingCharacter.traits.join(',')}.

      You are reacting to a post from ${originalCharacter.name}.
      The post is ${post.content}.

      You can comment on it, in under 280 characters. 
      Decide if your character likes the post and shares it.
      Maintain your character's unique perspective and speaking style.
      Include appropriate hashtags or use the ones from the post.

      Important:
      - Stay true to the character's known beliefs and values
      - Write in a conversational, social media friendly tone
      - Reference events or knowledge that would make sense for your character
      - Don't break character or reference being an AI

      Format your response as JSON:
      {
        "reaction": string,
        "like": boolean,
        "share": boolean
      }
    `;

    const output = await this.model.generateContent(prompt);
    const response = output.response;
    const text = response.text();
    const formattedResponse = this.formatReaction(
      text,
      post,
      reactingCharacter,
    );
    return formattedResponse;
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
      const formattedContent = this.formatReaction(
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

  private cleanMarkdownFormatting(text: string): string {
    return text
      .replace(/```json\n?/g, '')
      .replace(/^json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
  }

  private formatReaction(
    reaction: string,
    originalPost: Post,
    reactingCharacter: ICharacter,
  ): Post {
    try {
      const cleanInput = this.cleanMarkdownFormatting(reaction);
      const jsonReaction: Reaction = JSON.parse(cleanInput);
      if (jsonReaction.like === 'true') originalPost.likes++;
      if (jsonReaction.share === 'true') originalPost.shares++;

      originalPost.reaction.push(reactingCharacter.name, jsonReaction.reaction);
      return originalPost;
    } catch (error) {
      this.logger.error(`Failed to format post reaction: ${error.message}`);
      throw new GeminiException('Failed to format post reaction');
    }
  }

  private formatInitialThread(thread: string, characterName: string): Post[] {
    try {
      const cleanInput = this.cleanMarkdownFormatting(thread);
      const jsonThread = JSON.parse(cleanInput);

      const posts: Post[] = [
        {
          author: characterName,
          content: jsonThread.post1,
          likes: 0,
          shares: 0,
          reaction: [],
        },
        {
          author: characterName,
          content: jsonThread.post2,
          likes: 0,
          shares: 0,
          reaction: [],
        },
        {
          author: characterName,
          content: jsonThread.post3,
          likes: 0,
          shares: 0,
          reaction: [],
        },
        {
          author: characterName,
          content: jsonThread.post4,
          likes: 0,
          shares: 0,
          reaction: [],
        },
      ];

      return posts.filter((post) => post.content !== undefined);
    } catch (error) {
      this.logger.error(`Failed to format thread: ${error.message}`);
      throw new GeminiException('Failed to format thread');
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
}
