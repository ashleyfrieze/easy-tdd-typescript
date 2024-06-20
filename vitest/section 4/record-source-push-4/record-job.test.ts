import { runRecordJob } from './record-job';
import { findPosts } from './record-retrieve';
import { send } from './record-sender';
import * as logger from './logger';

vi.mock('./record-retrieve', () => ({
  findPosts: vi.fn(() =>
    Promise.resolve({
      who: 'userId = 2',
      subject: 'Food',
      summary: 'Shorty',
      count: 123,
    })
  ),
}));

vi.mock('./record-sender', () => ({
  send: vi.fn(),
}));

const mockSender = vi.mocked(send);
const mockFindPosts = vi.mocked(findPosts);

describe('Record job', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('will push to the sender smaller data', async () => {
    mockFindPosts.mockImplementation(() =>
      Promise.resolve({
        who: 'u',
        subject: 'F',
        summary: 'S',
        count: 123,
      })
    );

    await runRecordJob();

    expect(mockSender).toHaveBeenCalledWith(
      expect.objectContaining({
        metadata: expect.anything(),
        who: 'u',
        subject: 'F',
        summary: 'S',
        count: 123,
      })
    );
  });

  it('will push to the sender the data received from the retriever', async () => {
    await runRecordJob();

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

  it('will not send if the findposts function fails', async () => {
    mockFindPosts.mockRejectedValue(new Error('boom'));

    await runRecordJob();

    expect(mockSender).not.toHaveBeenCalled();
  });

  it('will log an error if something goes wrong', async () => {
    const loggerErrorSpy = vi.spyOn(logger, 'logError');

    mockFindPosts.mockRejectedValue(new Error('boom'));

    await runRecordJob();

    expect(loggerErrorSpy).toHaveBeenCalled();
  });

  it('will not log an error if nothing goes wrong', async () => {
    const loggerErrorSpy = vi.spyOn(logger, 'logError');

    await runRecordJob();

    expect(loggerErrorSpy).not.toHaveBeenCalled();
  });
});
