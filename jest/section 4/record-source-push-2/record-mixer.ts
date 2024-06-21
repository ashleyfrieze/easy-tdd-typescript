import { findPosts, PostAndCount } from './record-retrieve';
import { makeSourceMetadata, RecordSource } from './record-source';

export type PostAndCountAndMetadata = PostAndCount & { metadata: RecordSource };

export const prepareRecord = async (fetcher: typeof findPosts): Promise<PostAndCountAndMetadata> => ({
  ...(await fetcher()),
  metadata: makeSourceMetadata(),
});
