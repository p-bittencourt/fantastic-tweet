import { Injectable } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { LlmService } from './llm.service';
import { sampleCharacters } from '../characters/samples/character.sample';

@Injectable()
export class ThreadsService {
  constructor(private llmService: LlmService) {}
  async create(createThreadDto: CreateThreadDto) {
    const character = sampleCharacters[1];
    const output = await this.llmService.createInitialPost(
      'Technological Advancements',
      character,
    );
    console.log('output', output);
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
