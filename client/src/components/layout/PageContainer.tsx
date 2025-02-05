import React from 'react';
import ThreadInput from '../thread/ThreadInput';
import CharacterGallery from '../characters/CharacterGallery';
import { sampleFictionalThread } from '../../types/thread-sample';
import { Thread } from '../thread/Thread';

const PageContainer: React.FC = () => {
  return (
    <>
      <main className="flex-1 container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="lg:hidden mb-4">
          <ThreadInput />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <div className="w-full lg:w-3/4">
            <Thread thread={sampleFictionalThread} />
          </div>
          <div className="w-full lg:w-1/4 space-y-4">
            <div className="hidden lg:block">
              <ThreadInput />
            </div>
            <CharacterGallery />
          </div>
        </div>
      </main>
    </>
  );
};

export default PageContainer;
