export type Post = {
  who: string;
  subject: string;
  summary: string;
};

export type PostAndCount = Post & { count: number };

export const findPosts = async (): Promise<PostAndCount> => ({
  who: 'userId = 1',
  subject: 'Foo',
  summary: 'Short',
  count: 12,
});
