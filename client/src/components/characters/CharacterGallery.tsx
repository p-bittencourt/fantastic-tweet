import React, { useState } from 'react';
import { sampleFictionalCharacters } from '../../types/character-samples';
import CharacterCard from './CharacterCard';

const CharacterGallery: React.FC = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>('');

  return (
    <div className="p-3 lg:p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg lg:text-xl font-bold mb-3">
        Available Characters
      </h2>
      <div className="grid grid-cols-2 gap-2 lg:gap-3">
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
