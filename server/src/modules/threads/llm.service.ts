import { Inject, Injectable } from '@nestjs/common';
import { ICharacter } from '../characters/types/character.type';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_MODEL } from './gemini.provider';

@Injectable()
export class LlmService {
  constructor(@Inject(GEMINI_MODEL) private readonly model: GenerativeModel) {}
  async createInitialPost(topic: string, character: ICharacter) {
    const prompt = `
      You are ${character.name} from ${character.universe}.
      Personality traits: ${character.traits.join(',')}.

      Write a Twitter/X thread (2-3 connected posts) about ${topic}
      Each post should be under 280 characters.
      Maintain your character's unique perspective and speaking style.
      Include appropriate hashtags if they fit your character's style.

      Important: 
      - Stay true to the character's known beliefs and values
      - Write in a conversational, social media friendly tone
      - Reference events or knowledge that would make sense for your character
      - Don't break character or reference being an AI

      Format your response as JSON:
      { 
        "post1": string,
        "post2": string
      } 
    `;

    const output = await this.model.generateContent(prompt);
    return output.response.text();
  }
}
