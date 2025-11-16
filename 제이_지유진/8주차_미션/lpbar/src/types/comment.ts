// types/comment.ts
export interface CommentAuthor {
  id: number;
  name: string;
  email?: string;
  avatar?: string | null;
}

export interface Comment {
  id: number;
  lpId: number;
  authorId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author?: CommentAuthor;
}

export interface CommentListResponse {
  data: {
    data: Comment[];
    nextCursor?: number;
    hasNext: boolean;
  };
  status: boolean;
  statusCode: number;
  message: string;
}

export interface CreateCommentPayload {
  lpId: number;
  content: string;
}
