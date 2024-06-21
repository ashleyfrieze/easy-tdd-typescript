export type Post = {
  who: string;
  subject: string;
  summary: string;
};

export type PostAndCount = Post & { count: number };

// As seen on the site
export type ServerPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type ServerPostsResponse = ServerPost[];

// TODO
export const convertServerPosts = (
  serverResponse: ServerPostsResponse
): PostAndCount | undefined => undefined;


export const findPosts = async (): Promise<PostAndCount> => ({
  who: 'userId = 1',
  subject: 'Foo',
  summary: 'Short',
  count: 12,
});