import { prepareRecord } from './record-mixer';
import { findPosts } from './record-retrieve';
import { send } from './record-sender';

export const runRecordJob = async (
  fetch: typeof findPosts,
  sender: typeof send
) => {
  await sender(await prepareRecord(fetch));
};
