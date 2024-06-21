import { runRecordJob } from './record-job';

describe('Record job', () => {
  it('will push to the sender the data received from the retriever', async () => {
    const mockSender = jest.fn();
    const mockFetcher = jest.fn(() =>
      Promise.resolve({
        who: 'userId = 2',
        subject: 'Food',
        summary: 'Shorty',
        count: 123,
      })
    );

    await runRecordJob(mockFetcher, mockSender);

    expect(mockSender).toHaveBeenCalledWith(
      expect.objectContaining({
        metadata: expect.anything(),
        who: 'userId = 2',
        subject: 'Food',
        summary: 'Shorty',
        count: 123,
      })
    );
  });
});
