import React, { createContext, useContext, useState } from 'react';
import { Thread } from '../types/thread.types';
import { sampleFictionalThread } from '../types/thread-sample';

interface ThreadContextType {
  currentThread: Thread;
  setCurrentThread: (thread: Thread) => void;
  isGenerating: boolean;
  setIsGenerating: (loading: boolean) => void;
}

const ThreadContext = createContext<ThreadContextType | undefined>(undefined);

export const ThreadProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentThread, setCurrentThread] = useState<Thread>(
    sampleFictionalThread
  );
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <ThreadContext.Provider
      value={{
        currentThread,
        setCurrentThread,
        isGenerating,
        setIsGenerating,
      }}
    >
      {children}
    </ThreadContext.Provider>
  );
};

export const useThread = () => {
  const context = useContext(ThreadContext);
  if (undefined === context) {
    throw new Error('useThread must be used within a ThreadProvider');
  }
  return context;
};
