import { cloneDeep } from 'lodash';
import posts from './data/posts.json';
import { convertServerPosts } from './record-retrieve';

describe('Record retrieval', () => {
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
        summary: 'quia et su',
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
