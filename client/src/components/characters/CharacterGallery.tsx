import React from 'react';
import { sampleFictionalCharacters } from '../../types/character-samples';
import CharacterCard from './CharacterCard';
import { ICharacter } from '../../types/character';

interface CharacterGalleryProps {
  selectedCharacters: ICharacter[];
  setSelectedCharacters: (characters: ICharacter[]) => void;
}

const CharacterGallery: React.FC<CharacterGalleryProps> = ({
  selectedCharacters,
  setSelectedCharacters,
}) => {
  const toggleCharacterSelection = (character: ICharacter) => {
    const isSelected = selectedCharacters.includes(character);
    if (!isSelected && selectedCharacters.length >= 4) {
      return;
    }
    const updatedSelection = isSelected
      ? selectedCharacters.filter((c) => c.id !== character.id)
      : [...selectedCharacters, character];
    setSelectedCharacters(updatedSelection);
  };
  return (
    <div className="p-3 lg:p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
      <h2 className="text-lg lg:text-xl font-bold mb-3">
        Available Characters
      </h2>
      <div className="grid grid-cols-2 gap-2 lg:gap-3">
        {sampleFictionalCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isSelected={selectedCharacters.includes(character)}
            onSelect={() => toggleCharacterSelection(character)}
            disabled={
              !selectedCharacters.includes(character) &&
              selectedCharacters.length >= 4
            }
          />
        ))}
      </div>
    </div>
  );
};

export default CharacterGallery;
