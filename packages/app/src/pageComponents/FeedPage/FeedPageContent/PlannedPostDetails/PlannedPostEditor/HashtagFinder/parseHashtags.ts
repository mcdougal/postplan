import { findHashtags } from '@/common/instagram';

export default (caption: string | null): Array<string> => {
  if (!caption) {
    return [];
  }

  const hashtags = findHashtags(caption);

  return hashtags.map((hashtag) => {
    return hashtag.toLowerCase();
  });
};
