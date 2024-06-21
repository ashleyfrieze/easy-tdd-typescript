import { prepareRecord } from './record-mixer';
import { findPosts } from './record-retrieve';

jest.mock('./record-retrieve', () => ({ findPosts: jest.fn() }));

const mockedFindPosts = jest.mocked(findPosts);

describe('Record mixer', () => {
  it('mixes the metadata with the found posts using a mock function', async () => {
    mockedFindPosts.mockImplementation(() =>
      Promise.resolve({
        who: 'userId = 2',
        subject: 'Food',
        summary: 'Shorty',
        count: 123,
      })
    );

    const mixed = await prepareRecord();

    // then there is metadata
    expect(mixed.metadata).toMatchObject({ timestamp: expect.anything() });

    // and an expected post and count
    expect(mixed).toMatchObject({
      who: 'userId = 2',
      subject: 'Food',
      summary: 'Shorty',
      count: 123,
    });

    expect(mockedFindPosts).toHaveBeenCalled();
  });
});
