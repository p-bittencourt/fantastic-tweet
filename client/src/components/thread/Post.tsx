import { Post as PostType } from '../../types/thread.types';

interface PostProps {
  post: PostType;
}

export const Post = ({ post }: PostProps) => {
  return (
    <article className="p-2 sm:p-4 border rounded-lg mb-2 sm:mb-4 shadow-sm cursor-pointer">
      <div className="hover:bg-sky-100 rounded">
        <div className="flex items-center mb-2 p-1 sm:p-2">
          <img
            src={post.author.picture}
            alt={`${post.author.name}'s avatar`}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
          />
          <h3 className="font-bold p-1 text-sm sm:text-base">
            {post.author.name}
          </h3>
        </div>

        <p className="mb-3 sm:mb-4 whitespace-pre-wrap text-sm sm:text-base">
          {post.content}
        </p>

        <div className="flex gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
          <span>❤️ {post.likes}</span>
          <span>🔄 {post.shares}</span>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {post.reaction.map((reaction, index) => (
          <div
            key={index}
            className="pl-2 sm:pl-4 border-l-2 border-gray-200 hover:bg-sky-100 rounded"
          >
            <div className="flex items-center gap-1 sm:gap-2 mb-1">
              <img
                src={reaction.author.picture}
                alt={`${reaction.author.name}'s avatar`}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
              />
              <div className="font-medium text-sm sm:text-base">
                {reaction.author.name}
              </div>
            </div>
            <p className="text-xs sm:text-sm">{reaction.reaction}</p>
          </div>
        ))}
      </div>
    </article>
  );
};
