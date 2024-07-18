import { getHashtagRegex } from '@/common/instagram';

export default (caption: string | null): number => {
  if (!caption) {
    return 0;
  }

  return (caption.match(getHashtagRegex()) || []).length;
};
