import { Thread as ThreadType } from '../../types/thread.types';
import { Post } from './Post';

interface ThreadProps {
  thread: ThreadType;
}

export const Thread = ({ thread }: ThreadProps) => {
  return (
    <div className="max-w-2xl mx-auto p-2 sm:p-4 dark:bg-gray900 dark:text-gray-200">
      <h1 className="text-3xl mb-2">This thread's theme: {thread.theme}</h1>
      {thread.posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
};
