import { HttpException, HttpStatus } from '@nestjs/common';

export class GeminiBaseException extends HttpException {
  constructor(
    message: string,
    error: string,
    status: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(
      {
        status,
        error,
        message,
      },
      status,
    );
  }
}

export class GeminiApiException extends GeminiBaseException {
  constructor(message: string) {
    super(message, 'Gemini API Error', HttpStatus.SERVICE_UNAVAILABLE);
  }
}

export class GeminiOverloadedException extends GeminiBaseException {
  constructor() {
    super(
      'The AI model is currently overloaded. Please try again in a few moments.',
      'Model Overloaded',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}

export class GeminiQuotaExceededException extends GeminiBaseException {
  constructor() {
    super(
      'API quota has been exceeded. Please try again later.',
      'Quota Exceeded',
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}

export class ThreadGenerationException extends GeminiBaseException {
  constructor(message: string) {
    super(
      message,
      'Thread Generation Failed',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class ContentFormattingException extends GeminiBaseException {
  constructor(message: string) {
    super(message, 'Content Formatting Error', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class CharacterValidationException extends GeminiBaseException {
  constructor(message: string) {
    super(message, 'Character Validation Failed', HttpStatus.BAD_REQUEST);
  }
}

export class TokenLimitException extends GeminiBaseException {
  constructor(message: string) {
    super(message, 'Token Limit Exceeded', HttpStatus.TOO_MANY_REQUESTS);
  }
}
