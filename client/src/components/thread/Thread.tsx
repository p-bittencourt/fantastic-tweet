import { useThread } from '../../context/ThreadContext';
import { Post } from './Post';

export const Thread = () => {
  const { currentThread, isGenerating } = useThread();

  if (isGenerating) {
    return <div>Generating Thread</div>;
  }
  return (
    <div className="max-w-2xl mx-auto p-2 sm:p-4 dark:bg-gray900 dark:text-gray-200">
      <h1 className="text-3xl mb-2">
        This thread's theme: {currentThread.theme}
      </h1>
      {currentThread.posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
};
