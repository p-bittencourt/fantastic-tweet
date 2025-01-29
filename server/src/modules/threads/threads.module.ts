import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { GeminiService } from './gemini/gemini.service';
import { GeminiModel } from './gemini/gemini.provider';

@Module({
  controllers: [ThreadsController],
  providers: [ThreadsService, GeminiService, GeminiModel],
})
export class ThreadsModule {}
