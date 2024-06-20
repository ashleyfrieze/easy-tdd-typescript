import { cloneDeep } from 'lodash';
import posts from './data/posts.json';
import { convertServerPosts, findPosts } from './record-retrieve';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const postHandler = vi.fn(() => HttpResponse.json(posts));

const handlers = [
  http.get('https://jsonplaceholder.typicode.com/posts', postHandler),
];

const server = setupServer(...handlers);

describe('Record retrieval', () => {
  describe('Fetching from the server', () => {
    beforeAll(() => {
      server.listen();
    });

    afterAll(() => {
      server.close();
    });

    beforeEach(() => {
      vi.restoreAllMocks();
    })

    it('can fetch the data from the server', async () => {
      expect(await findPosts()).toMatchObject({
        count: 100,
        who: 'UserId = 1',
        subject:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        summary: 'HOOT et su',
      });
    });

    it('Converts the summary when the body is empty', async () => {
      const postsWithEmptyBodyFirst = cloneDeep(posts);
      postsWithEmptyBodyFirst[0].body = '';

      postHandler.mockReturnValue(HttpResponse.json(postsWithEmptyBodyFirst));

      expect(await findPosts()).toMatchObject({
        summary: '',
      });
    });
  });

  describe('Data conversion', () => {
    it('Gets the correct count of the number of records', () => {
      expect(convertServerPosts(posts)).toMatchObject({ count: 100 });
    });

    it('Produces the correct user id for the first post', () => {
      expect(convertServerPosts(posts)).toMatchObject({ who: 'UserId = 1' });
    });

    it('Produces converted title', () => {
      expect(convertServerPosts(posts)).toMatchObject({
        subject:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      });
    });

    it('Converts the summary', () => {
      expect(convertServerPosts(posts)).toMatchObject({
        summary: 'HOOT et su',
      });
    });

    it('Converts the summary when the body is empty', () => {
      const postsWithEmptyBodyFirst = cloneDeep(posts);
      postsWithEmptyBodyFirst[0].body = '';
      expect(convertServerPosts(postsWithEmptyBodyFirst)).toMatchObject({
        summary: '',
      });
    });
  });
});
