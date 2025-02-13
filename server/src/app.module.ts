import { Module } from '@nestjs/common';
import { ThreadsModule } from './modules/threads/threads.module';
import { AppController } from './app.controller';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ThreadsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
