import { setupServer } from 'msw/node';
import { send } from './record-sender';
import { http, HttpResponse } from 'msw';

const receiver = jest.fn();

const server = setupServer(
  http.post('https://trackposts.com/', async (request) => {
    receiver(await request.request.json());
    return new HttpResponse(null, { status: 201 });
  })
);

describe('Record sender', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('sends the data to the target server', async () => {
    await send({
      who: 'UserId = 9',
      subject: 'Sub',
      summary: 'Sum',
      count: 99,
      metadata: {},
    });

    expect(receiver).toHaveBeenCalledWith({
      who: 'UserId = 9',
      subject: 'Sub',
      summary: 'Sum',
      count: 99,
      metadata: {},
    });
  });
});
