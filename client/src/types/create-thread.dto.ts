import { ICharacter } from './character';

export interface CreateThreadDto {
  theme: string;
  characters?: ICharacter[];
}
