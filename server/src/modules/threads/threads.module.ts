import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { GeminiService } from './gemini/gemini.service';
import { GeminiModel } from './gemini/gemini.provider';
import { FormatterService } from './gemini/formatter.service';
import { PromptService } from './gemini/prompt.service';

@Module({
  controllers: [ThreadsController],
  providers: [
    ThreadsService,
    GeminiService,
    GeminiModel,
    FormatterService,
    PromptService,
  ],
})
export class ThreadsModule {}
