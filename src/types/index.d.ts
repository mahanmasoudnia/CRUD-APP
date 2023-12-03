export type Token = {
  role: string;
  userId: string;
  iat: number;
  exp: number;
};

export type Post = {
  id: string;
  title: string;
  date: string;
  content: string;
  userId: string;
};

export type PostsTableProps = {
  data: Post[];
};
