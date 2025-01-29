import { Inject, Injectable } from '@nestjs/common';
import { ICharacter } from '../../characters/types/character.type';
import { GenerativeModel } from '@google/generative-ai';
import { GEMINI_MODEL } from './gemini.provider';

export interface Post {
  content: string;
  likes: number;
  shares: number;
  reaction: string[];
}

export interface Thread {
  post1: Post;
  post2: Post;
  post3?: Post;
  post4?: Post;
}

@Injectable()
export class GeminiService {
  constructor(@Inject(GEMINI_MODEL) private readonly model: GenerativeModel) {}
  async generateThread(topic: string, characters: ICharacter[]) {
    const initialPost = await this.createInitialPost(topic, characters[0]);
    console.log('initial post', initialPost);
    const reaction = await this.reactToPost(
      initialPost,
      characters[0],
      characters[1],
    );
    console.log('Reaction', reaction);
  }

  private async createInitialPost(topic: string, character: ICharacter) {
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
        "post2": string,
        ...
      } 
    `;

    const output = await this.model.generateContent(prompt);
    const response = output.response;
    const text = response.text();
    // a helper function to format the output?
    return text;
  }

  private async reactToPost(
    post: string,
    originalCharacter: ICharacter,
    reactingCharacter: ICharacter,
  ) {
    const prompt = `
      You are ${reactingCharacter.name} from ${reactingCharacter.universe}.
      Personality traits: ${reactingCharacter.traits.join(',')}.

      You are reacting to a post from ${originalCharacter.name}.
      The post is ${post}.

      You can comment on it, in under 280 characters. 
      Decide if your character likes the post and shares it.
      Maintain your character's unique perspective and speaking style.
      Include appropriate hashtags or use the ones from the post.

      Important:
      - Stay true to the character's known beliefs and values
      - Write in a conversational, social media friendly tone
      - Reference events or knowledge that would make sense for your character
      - Don't break character or reference being an AI

      Format your response as JSON:
      {
        "reaction": string,
        "like": boolean,
        "share": boolean
      }
    `;

    const output = await this.model.generateContent(prompt);
    const response = output.response;
    const text = response.text();
    return text;
  }
}
