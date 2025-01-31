import { Injectable, Logger } from '@nestjs/common';
import {
  GeminiApiException,
  GeminiBaseException,
  GeminiOverloadedException,
  GeminiQuotaExceededException,
} from './gemini.exceptions';

@Injectable()
export class GeminiErrorHandler {
  private readonly logger = new Logger(GeminiErrorHandler.name);

  handleGeminiError(error: any, context: string): never {
    this.logger.error(`${context}: ${error.message}`);

    // Check if it's a GoogleGenerativeAI Error
    if (error.message?.includes('[GoogleGenerativeAI Error]')) {
      // Handle 503 Service Unavailable due to overload
      if (error.message.includes('503 Service Unavailable')) {
        throw new GeminiOverloadedException();
      }

      // Handle 429 Too Many Requests due to quota
      if (error.message.includes('429 Too Many Requests')) {
        throw new GeminiQuotaExceededException();
      }

      // Handle other API errors
      throw new GeminiApiException(this.extractErrorMessage(error.message));
    }

    // Re-throw if it's already one of the custom exceptions
    if (error instanceof GeminiBaseException) {
      throw error;
    }

    // Default error handling
    throw new GeminiApiException(`Unexpected error during ${context}`);
  }

  private extractErrorMessage(fullError: string): string {
    // Extract the actual error message from the Gemini API error string
    const match = fullError.match(/\[(503|429)[^\]]+\]\s*(.+)/);
    return match ? match[2] : fullError;
  }
}
