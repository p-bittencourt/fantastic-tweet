import { ICharacter } from 'src/modules/characters/types/character.type';

export class CreateThreadDto {
  theme: string;
  characters?: ICharacter[];
}
