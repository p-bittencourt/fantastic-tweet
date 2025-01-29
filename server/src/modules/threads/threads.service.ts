import { Injectable } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { GeminiService } from './gemini/gemini.service';
import { sampleCharacters } from '../characters/samples/character.sample';

@Injectable()
export class ThreadsService {
  constructor(private geminiService: GeminiService) {}
  async create(createThreadDto: CreateThreadDto) {
    const characters = [sampleCharacters[0], sampleCharacters[2]];
    const output = await this.geminiService.generateThread(
      'Technological Advancements',
      characters,
    );
    return;
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
