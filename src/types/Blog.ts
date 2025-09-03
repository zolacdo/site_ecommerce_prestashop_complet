export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role: string;
  };
  publishedAt: Date;
  readTime: string;
  tags: string[];
  likes: number;
  comments: Comment[];
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: Date;
  likes: number;
  replies?: Comment[];
  isLiked?: boolean;
}