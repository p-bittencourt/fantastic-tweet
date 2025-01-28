import React from 'react';
import ThreadInput from '../thread/ThreadInput';
import CharacterGallery from '../characters/CharacterGallery';

const PageContainer: React.FC = () => {
  return (
    <>
      <main className="flex-1 container mx-auto px-4 py-8">
        <ThreadInput />
        <CharacterGallery />
      </main>
    </>
  );
};

export default PageContainer;
