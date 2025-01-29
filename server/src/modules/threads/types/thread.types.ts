export interface Reaction {
  author: string;
  reaction: string;
  like: string;
  share: string;
}

export interface Post {
  author: string;
  content: string;
  likes: number;
  shares: number;
  reaction: string[];
}

export interface Thread {
  post1: Post;
  post2: Post;
  post3?: Post;
  post4?: Post;
}
