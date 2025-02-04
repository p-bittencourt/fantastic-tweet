export interface ICharacter {
  id: string;
  name: string;
  universe: string;
  traits?: string[]; // Frontend only property to keep UI cleaner
  personalityTraits: string[];
  beliefs: string[];
  speakingStyle: string;
  imageUrl: string;
}
