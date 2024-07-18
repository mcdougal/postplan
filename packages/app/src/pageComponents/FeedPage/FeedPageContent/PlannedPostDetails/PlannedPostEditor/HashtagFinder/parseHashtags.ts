import { getHashtagRegex } from '@/common/instagram';

export default (caption: string | null): Array<string> => {
  if (!caption) {
    return [];
  }

  const hashtags = caption.match(getHashtagRegex()) || [];

  return hashtags.map((hashtag) => {
    return hashtag.toLowerCase();
  });
};
