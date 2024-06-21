import { findPosts, PostAndCount } from './record-retrieve';
import { makeSourceMetadata, RecordSource } from './record-source';

export type PostAndCountAndMetadata = PostAndCount & { metadata: RecordSource };

export const prepareRecord = async (): Promise<PostAndCountAndMetadata> => ({
  ...(await findPosts()),
  metadata: makeSourceMetadata(),
});
