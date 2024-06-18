import { makeSourceMetadata } from './record-source';

vi.hoisted(() => {
  process.env.DEPLOYED_ENVIRONMENT = 'TEST_ENV_1';
  process.env.MACHINE_NAME = 'MY_LAPTOP';
});

const originalEnvironment = { ...process.env };

describe('Record source', () => {

  afterEach(() => {
    process.env = { ...originalEnvironment };
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
});
