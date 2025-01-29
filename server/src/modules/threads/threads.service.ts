import { Injectable, Logger } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { GeminiService } from './gemini/gemini.service';
import { sampleCharacters } from '../characters/samples/character.sample';

@Injectable()
export class ThreadsService {
  private readonly logger = new Logger(ThreadsService.name);
  constructor(private geminiService: GeminiService) {}
  async create(createThreadDto: CreateThreadDto) {
    try {
      const characters = [sampleCharacters[4], sampleCharacters[5]];
      const output = await this.geminiService.generateThread(
        'Climate Change',
        characters,
      );
      return;
    } catch (error) {
      this.logger.error(`Faile to creat thread: ${error.message}`);
      throw error;
    }
  }

  findAll() {
    return `This action returns all threads`;
  }

  findOne(id: number) {
    return `This action returns a #${id} thread`;
  }

  update(id: number, updateThreadDto: UpdateThreadDto) {
    return `This action updates a #${id} thread`;
  }

  remove(id: number) {
    return `This action removes a #${id} thread`;
  }
}
