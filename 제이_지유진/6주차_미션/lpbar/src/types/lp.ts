export interface Author {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Like {
  id: number;
  userId: number;
  lpId: number;
}

export interface LP {
  author: Author;
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Like[];
}

export interface LPResponse {
  data: LP[];
  nextCursor: number;
  hasNext: boolean;
}

export type TLP = {
  id: number;
  title: string;
  thumbnail: string;
  createdAt: string;
  likes: { id: number; userId: number; lpId: number }[];
};

export type TGetLPResponse = {
  data: {
    data: TLP[];
    nextCursor: number;
    hasNext: boolean;
  };
};
