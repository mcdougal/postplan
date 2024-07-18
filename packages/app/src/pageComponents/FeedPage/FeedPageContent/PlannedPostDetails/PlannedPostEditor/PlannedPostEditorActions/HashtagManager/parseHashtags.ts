import { getHashtagRegex } from '@/common/instagram';

export default (caption: string | null): Array<string> => {
  if (!caption) {
    return [];
  }

  return caption.match(getHashtagRegex()) || [];
};
