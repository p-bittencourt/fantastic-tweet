import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { CharactersModule } from './modules/characters/characters.module';
import { ThreadsModule } from './modules/threads/threads.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    // ThrottlerModule.forRoot([
    //   {
    //     ttl: 60000,
    //     limit: 10,
    //   },
    // ]),
    CharactersModule,
    ThreadsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
