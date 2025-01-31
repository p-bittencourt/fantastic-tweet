import { Injectable } from '@nestjs/common';
import { ICharacter } from 'src/modules/characters/types/character.type';
import { Post } from '../types/thread.types';

@Injectable()
export class PromptService {
  createInitialThreadPrompt(topic: string, character: ICharacter) {
    return `
          You are ${character.name} from ${character.universe}.
          Personality traits: ${character.personalityTraits.join(',')}.
              Write a Twitter/X thread (2-3 connected posts) about ${topic}
          Each post should be under 280 characters.
          Maintain your character's unique belief as: ${character.beliefs.join(',')} 
          Maintain your character's unique speaking style as well: ${character.speakingStyle}.
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
  }

  createReactionPrompt(
    post: Post,
    originalCharacter: ICharacter,
    reactingCharacter: ICharacter,
  ) {
    return `
          You are ${reactingCharacter.name} from ${reactingCharacter.universe}.
          Personality traits: ${reactingCharacter.personalityTraits.join(',')}.
    
          You are reacting to a post from ${originalCharacter.name}.
          The post is ${post.content}.
    
          Maintain your character's unique belief as: ${reactingCharacter.beliefs.join(',')} 
          Maintain your character's unique speaking style as well: ${reactingCharacter.speakingStyle}.

          You can comment on it, in under 280 characters. 
          Decide if your character likes the post and shares it.
          If your charac doesn't like it he can be critical.
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
  }
}
