import { PostAndCountAndMetadata } from './record-mixer';

const TARGET_SERVER = 'https://trackposts.com';

export const send = async (data: PostAndCountAndMetadata) => {
  await fetch(TARGET_SERVER, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
