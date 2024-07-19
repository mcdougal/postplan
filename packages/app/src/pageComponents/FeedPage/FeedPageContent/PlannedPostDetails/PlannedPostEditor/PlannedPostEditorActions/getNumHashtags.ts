import { findHashtags } from '@/common/instagram';

export default (caption: string | null): number => {
  if (!caption) {
    return 0;
  }

  return findHashtags(caption).length;
};
