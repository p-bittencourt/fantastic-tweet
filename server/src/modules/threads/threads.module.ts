import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { LlmService } from './llm.service';
import { GeminiModel } from './gemini.provider';

@Module({
  controllers: [ThreadsController],
  providers: [ThreadsService, LlmService, GeminiModel],
})
export class ThreadsModule {}
