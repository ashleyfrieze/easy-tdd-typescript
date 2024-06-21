import { prepareRecord } from './record-mixer';

describe('Record mixer', () => {
  it('mixes the metadata with the found posts', async () => {
    const mixed = await prepareRecord(() =>
      Promise.resolve({
        who: 'userId = 2',
        subject: 'Food',
        summary: 'Shorty',
        count: 123,
      })
    );

    // then there is metadata
    expect(mixed.metadata).toMatchObject({ timestamp: expect.anything() });

    // and an expected post and count
    expect(mixed).toMatchObject({
      who: 'userId = 2',
      subject: 'Food',
      summary: 'Shorty',
      count: 123,
    });
  });

  it('mixes the metadata with the found posts using a mock function', async () => {
    const mockFetchPost = jest.fn(() =>
      Promise.resolve({
        who: 'userId = 2',
        subject: 'Food',
        summary: 'Shorty',
        count: 123,
      })
    );

    const mixed = await prepareRecord(mockFetchPost);

    // then there is metadata
    expect(mixed.metadata).toMatchObject({ timestamp: expect.anything() });

    // and an expected post and count
    expect(mixed).toMatchObject({
      who: 'userId = 2',
      subject: 'Food',
      summary: 'Shorty',
      count: 123,
    });

    expect(mockFetchPost).toHaveBeenCalled();
  });
});
