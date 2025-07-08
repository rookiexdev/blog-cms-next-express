export type Blog = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  authorId: string;
  author: {
    username: string;
  };
};
