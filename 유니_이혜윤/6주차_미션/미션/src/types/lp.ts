// Lp 리스트
export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type TLP = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
};

export type ResponseLpListDto = {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    data: TLP[];
    nextCursor: number;
    hasNext: boolean;
  };
};

// Lp 상세페이지
export type RequestLpDto = {
  lpId: number;
};

export type LpAuthor = {
  id: number;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
};

export type LpDetailData = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: LpAuthor;
  tags: string[];
  likes: LpLike[];
};

export type LpDetailResponse = {
  status: boolean;
  message: string;
  statusCode: number;
  data: LpDetailData;
};

// Lp 상세페이지 댓글
export type Author = {
  id: number;
  name: string;
  email: string;
  bio: boolean;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CLP = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
};

export type CommentListDto = {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    data: CLP[];
    nextCursor: number;
    hasNext: boolean;
  };
};

// Lp 상세페이지 좋아요
export type LpLike = {
  id: number;
  userId: number;
  lpId: number;
};

export type ResponseLikeLpDto = {
  status: boolean;
  statusCode: string;
  message: string;
  data: LpLike;
};
