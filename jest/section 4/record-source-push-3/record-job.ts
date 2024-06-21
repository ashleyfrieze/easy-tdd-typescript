import { logError } from './logger';
import { prepareRecord } from './record-mixer';
import { send } from './record-sender';

export const runRecordJob = async () => {
  try {
    await send(await prepareRecord());
  } catch (error) {
    logError(error);
  }
};
