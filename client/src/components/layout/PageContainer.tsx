import React from 'react';
import ThreadInput from '../thread/ThreadInput';
import CharacterGallery from '../characters/CharacterGallery';
import { sampleFictionalThread } from '../../types/thread-sample';
import { Thread } from '../thread/Thread';

const PageContainer: React.FC = () => {
  return (
    <>
      <main className="flex-1 container mx-auto px-4 py-8">
        <ThreadInput />
        <Thread thread={sampleFictionalThread} />
        <CharacterGallery />
      </main>
    </>
  );
};

export default PageContainer;
