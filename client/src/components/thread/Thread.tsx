import { Thread as ThreadType } from '../../types/thread.types';
import { Post } from './Post';

interface ThreadProps {
  thread: ThreadType;
}

export const Thread = ({ thread }: ThreadProps) => {
  return (
    <div className="max-w-2xl mx-auto p-2 sm:p-4">
      {thread.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
};
