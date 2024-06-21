import { makeSourceMetadata } from './record-source';

const originalEnvironment = { ...process.env };

describe('Record source', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    process.env = { ...originalEnvironment };
    jest.useRealTimers();
  });

  it('Provides the environment name', () => {
    expect(makeSourceMetadata()).toMatchObject({ deployed: 'TEST_ENV_1' });
  });

  it('Provides the machine name', () => {
    expect(makeSourceMetadata()).toMatchObject({ machineName: 'MY_LAPTOP' });
  });

  it('Provides debug when language is known and debug flag is set', () => {
    process.env.DEBUG_FLAG = 'true';
    expect(makeSourceMetadata()).toMatchObject({
      debugData: { language: expect.stringMatching(/.+/) },
    });
  });

  it('Provides debug when language is unknown and debug flag is set', () => {
    process.env.DEBUG_FLAG = 'true';
    delete process.env.LANG;
    expect(makeSourceMetadata()).toMatchObject({
      debugData: { language: '' },
    });
  });

  it('Provides no debug when debug flag is not set', () => {
    expect(makeSourceMetadata()).not.toMatchObject({
      debugData: expect.anything(),
    });
  });

  // for illustration
  it('Provides a timestamp on each object', () => {
    expect(makeSourceMetadata()).toMatchObject({
      timestamp: expect.anything(),
    });
    expect(makeSourceMetadata().timestamp).toBeGreaterThan(1718635476000);

    // given the time is  1718635476000
    jest.setSystemTime(1718635476000);

    // when I get the metadata
    const metadata = makeSourceMetadata();

    // then the time is  1718635476000
    expect(metadata).toMatchObject({ timestamp: 1718635476000 });
  });

  it('Provides a timestamp on each object - concisely', () => {
    const now = 1718635476000;

    jest.setSystemTime(now);

    expect(makeSourceMetadata()).toMatchObject({ timestamp: now });
  });
});
