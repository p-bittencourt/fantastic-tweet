import { useThread } from '../../context/ThreadContext';
import { Post } from './Post';

export const Thread = () => {
  const { currentThread, isGenerating } = useThread();

  if (isGenerating) {
    return (
      <div className="max-w-2xl mx-auto p-2 sm:p-4 dark:bg-gray-900 dark:text-gray-200">
        <div className="animate-pulse space-y-4">
          {/* Loading theme skeleton */}
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>

          {/* Loading posts skeleton - showing 3 placeholder posts */}
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="border dark:border-gray-700 p-4 rounded-lg space-y-3"
            >
              {/* Avatar and name row */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </div>
              </div>
              {/* Post content skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
              </div>
              {/* Interaction buttons skeleton */}
              <div className="flex space-x-12 pt-2">
                {[1, 2, 3].map((btnIndex) => (
                  <div
                    key={btnIndex}
                    className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8"
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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
