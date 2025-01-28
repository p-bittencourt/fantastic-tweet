import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { LlmService } from './llm.service';

@Module({
  controllers: [ThreadsController],
  providers: [ThreadsService, LlmService],
})
export class ThreadsModule {}
