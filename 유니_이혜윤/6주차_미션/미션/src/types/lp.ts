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
