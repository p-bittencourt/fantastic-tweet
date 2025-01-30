import { UsageMetadata } from '@google/generative-ai';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TokensService {
  private readonly logger = new Logger(TokensService.name);
  private totalPromptTokenCount = 0;
  private totalOutputTokenCount = 0;
  private threadTokenCount = 0;
  private totalTokensPerSession = [];

  countTokens(response: UsageMetadata): void {
    this.totalPromptTokenCount += response.promptTokenCount;
    this.totalOutputTokenCount += response.candidatesTokenCount;
    this.threadTokenCount += response.totalTokenCount;
  }

  displayTokenCount() {
    this.logger.debug(
      `Total prompt token count: ${this.totalPromptTokenCount}
           Total output token count: ${this.totalOutputTokenCount}
           Total token count from thread generation: ${this.threadTokenCount}
          `,
    );
  }

  displaySessionTokenCount() {
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

  storeSessionTokens(): void {
    this.totalTokensPerSession.push(this.threadTokenCount);
    this.totalPromptTokenCount = 0;
    this.totalOutputTokenCount = 0;
    this.threadTokenCount = 0;
  }
}
