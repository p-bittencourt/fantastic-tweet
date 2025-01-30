import { Injectable, Logger } from '@nestjs/common';
import { Post, Reaction } from '../types/thread.types';
import { ICharacter } from 'src/modules/characters/types/character.type';
import { GeminiException } from 'src/common/exceptions/gemini.exception';

@Injectable()
export class FormatterService {
  private readonly logger = new Logger(FormatterService.name);
  private cleanMarkdownFormatting(text: string): string {
    return text
      .replace(/```json\n?/g, '')
      .replace(/^json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
  }

  formatReaction(reaction: string, author: string): Reaction {
    try {
      const cleanInput = this.cleanMarkdownFormatting(reaction);
      const jsonReaction: Reaction = JSON.parse(cleanInput);
      jsonReaction.author = author;
      return jsonReaction;
    } catch (error) {
      this.logger.error(
        `Failed to format post reaction: ${error.message}. Reaction: ${reaction}`,
      );
      throw new GeminiException('Failed to format post reaction');
    }
  }

  asyncAddLikesAndShares(reaction: Reaction, post: Post): Post {
    if (reaction.like === true) {
      post.likes++;
    }
    if (reaction.share === true) {
      post.shares++;
    }
    return post;
  }

  formatInitialThread(thread: string, characterName: string): Post[] {
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
}
