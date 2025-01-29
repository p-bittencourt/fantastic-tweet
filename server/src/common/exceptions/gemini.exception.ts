import { HttpException, HttpStatus } from '@nestjs/common';

export class GeminiException extends HttpException {
  constructor(message: string) {
    super(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Gemini API Error',
        message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
