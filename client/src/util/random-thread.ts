import {
  sampleFictionalThread,
  sampleFictionalThread2,
  sampleFictionalThread3,
} from '../types/thread-sample';
import { Thread } from '../types/thread.types';

const sampleThreads = [
  sampleFictionalThread,
  sampleFictionalThread2,
  sampleFictionalThread3,
];

export const useRandomThread = (): Thread => {
  const randomIndex = Math.floor(Math.random() * sampleThreads.length);
  return sampleThreads[randomIndex];
};
