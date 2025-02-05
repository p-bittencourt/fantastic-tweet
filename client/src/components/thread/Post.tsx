import { Post as PostType } from '../../types/thread.types';

interface PostProps {
  post: PostType;
}

export const Post = ({ post }: PostProps) => {
  return (
    <article className="p-4 border rounded-lg mb-4 shadow-sm">
      <div className="hover:bg-sky-100 rounded">
        <div className="flex items-center mb-2 p-2">
          <img
            src={post.author.picture}
            alt={`${post.author.name}'s avatar`}
            className="w-10 h-10 rounded-full object-cover"
          />
          <h3 className="font-bold p-1">{post.author.name}</h3>
        </div>

        <p className="mb-4 whitespace-pre-wrap">{post.content}</p>

        <div className="flex gap-4 text-sm text-gray-500 mb-4">
          <span>❤️ {post.likes}</span>
          <span>🔄 {post.shares}</span>
        </div>
      </div>

      <div className="space-y-3">
        {post.reaction.map((reaction, index) => (
          <div
            key={index}
            className="pl-4 border-l-2 border-gray-200 hover:bg-sky-100 rounded"
          >
            <div className="flex items-center gap-2 mb-1">
              <img
                src={reaction.author.picture}
                alt={`${reaction.author.name}'s avatar`}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="font-medium">{reaction.author.name}</div>
            </div>
            <p className="text-sm">{reaction.reaction}</p>
          </div>
        ))}
      </div>
    </article>
  );
};
