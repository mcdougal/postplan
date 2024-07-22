import { getSiteUrl } from '@/common/env';

export default {
  getPath: (): string => {
    return `/instagram/oauth`;
  },
  getAbsoluteUrl: (): string => {
    return `${getSiteUrl()}/instagram/oauth`;
  },
};
