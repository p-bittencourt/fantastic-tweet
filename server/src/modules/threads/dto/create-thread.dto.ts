import { ICharacter } from 'src/modules/characters/types/character.type';

export class CreateThreadDto {
  topic: string;
  characters?: ICharacter[];
}
