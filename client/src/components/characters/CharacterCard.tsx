import React from 'react';
import { ICharacter } from '../../types/character';

interface CharacterCardProps {
  character: ICharacter;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isSelected = false,
  onSelect,
}) => {
  return (
    <div
      className={`
        p-4 rounded-lg border-2 cursor-pointer transition-all
        ${
          isSelected
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-blue-300'
        }
      `}
      onClick={() => onSelect?.(character.id)}
    >
      <div className="aspect-square w-full mb-3 overflow-hidden rounded-lg">
        <img
          src={character.imageUrl}
          alt={character.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-bold text-lg mb-1">{character.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{character.universe}</p>
      <div className="flex flex-wrap gap-1">
        {character.traits?.map((trait) => (
          <span
            key={trait}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
          >
            {trait}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CharacterCard;
