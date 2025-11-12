// 댓글 작성자의 정보 타입
export interface Author {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

// 댓글 1개에 대한 정보 타입
export interface Comment {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

// 무한스크롤을 위한 페이지 단위 댓글 목록 타입
export interface CommentPage {
  data: Comment[];
  nextPage?: number;
}

// 전체 API 응답 타입 (댓글 목록 조회 성공 시)
export interface CommentResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: CommentPage;
}

// 댓글 삭제 타입
export interface DeleteComment {
  lpId: number;
  commentId: number;
}

// 댓글 수정 타입
export interface UpdateComment {
  lpId: number;
  commentId: number;
  content: string;
}
