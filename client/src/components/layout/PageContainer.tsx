import React, { useState } from 'react';
import ThreadInput from '../thread/ThreadInput';
import CharacterGallery from '../characters/CharacterGallery';
import {
  sampleFictionalThread,
  sampleFictionalThread2,
} from '../../types/thread-sample';
import { Thread } from '../thread/Thread';
import { ICharacter } from '../../types/character';

const PageContainer: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedCharacters, setSelectedCharacters] = useState<ICharacter[]>(
    []
  );

  return (
    <>
      <main className="flex-1 container mx-auto px-2 sm:px-4 py-4 sm:py-8 bg-white dark:bg-gray-600 dark:text-gray-200">
        <div className="lg:hidden mb-4">
          <ThreadInput
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            selectedCharacters={selectedCharacters}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <div className="w-full lg:w-3/4">
            <Thread thread={sampleFictionalThread2} />
          </div>
          <div className="w-full lg:w-1/4 space-y-4">
            <div className="hidden lg:block">
              <ThreadInput
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
                selectedCharacters={selectedCharacters}
              />
            </div>
            <CharacterGallery
              selectedCharacters={selectedCharacters}
              setSelectedCharacters={setSelectedCharacters}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default PageContainer;
