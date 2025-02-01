import React, { useState } from 'react';
import { sampleFictionalCharacters } from '../../types/character-samples';
import CharacterCard from './CharacterCard';

const CharacterGallery: React.FC = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>('');

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Choose a Character</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sampleFictionalCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isSelected={selectedCharacterId === character.id}
            onSelect={setSelectedCharacterId}
          />
        ))}
      </div>
    </div>
  );
};

export default CharacterGallery;
