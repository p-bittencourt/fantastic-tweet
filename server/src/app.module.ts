import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { CharactersModule } from './modules/characters/characters.module';
import { ThreadsModule } from './modules/threads/threads.module';

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
})
export class AppModule {}
