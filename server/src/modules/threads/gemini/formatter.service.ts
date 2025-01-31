import { Injectable, Logger } from '@nestjs/common';
import { Post, Reaction } from '../types/thread.types';
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

  private sanitizeJson(text: string): string {
    return (
      text
        // Replace curly quotes with straight quotes
        .replace(/[""]/g, '"')
        // Replace any other potentially problematic Unicode quotes
        .replace(/['']/g, "'")
        // Handle any potential line endings
        .replace(/\r\n/g, '\n')
        // Remove any potential BOM
        .replace(/^\uFEFF/, '')
        // Handle escaped quotes within text
        .replace(/(?<!\\)\\"/g, '"')
    );
  }

  private safeJsonParse(text: string): any {
    try {
      return JSON.parse(text);
    } catch (error) {
      const sanitized = this.sanitizeJson(text);
      try {
        // Try to clean up the JSON string if initial parse fails
        return JSON.parse(sanitized);
      } catch (secondError) {
        throw new Error(`Failed to parse JSON: ${secondError.message}`);
      }
    }
  }

  formatReaction(reaction: string, author: string): Reaction {
    try {
      const cleanInput = this.cleanMarkdownFormatting(reaction);
      const jsonReaction = this.safeJsonParse(cleanInput) as Reaction;

      if (!jsonReaction || typeof jsonReaction.reaction !== 'string') {
        this.logger.warn('Invalid reaction format: missing required fields');
        return null;
      }

      return {
        author,
        reaction: jsonReaction.reaction,
        like: Boolean(jsonReaction.like),
        share: Boolean(jsonReaction.share),
      };
    } catch (error) {
      this.logger.warn(
        `Failed to format post reaction: ${error.message}. Skipping reaction. Raw content: ${reaction}`,
      );
      return null;
    }
  }

  addLikesAndShares(reaction: Reaction | null, post: Post): Post {
    if (!reaction) return post;

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
      const jsonThread = this.safeJsonParse(cleanInput);

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

      const validPosts = posts.filter((post) => post.content !== undefined);

      if (validPosts.length === 0) {
        throw new Error('No valid posts found in thread');
      }

      return validPosts;
    } catch (error) {
      this.logger.error(`Failed to format thread: ${error.message}`);
      throw new GeminiException('Failed to format thread');
    }
  }
}
