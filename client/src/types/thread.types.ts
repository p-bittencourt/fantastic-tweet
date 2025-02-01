export interface Reaction {
  author: {
    id: string;
    name: string;
  };
  reaction: string;
  like?: boolean;
  share?: boolean;
}

export interface Post {
  author: {
    id: string;
    name: string;
  };
  content: string;
  likes: number;
  shares: number;
  reaction: Reaction[];
}

export type Thread = Post[];
