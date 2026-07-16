import { getSiteUrl } from '@/common/env';

export default {
  getPath: (): string => {
    return `/instagram/connect`;
  },
  getAbsoluteUrl: (): string => {
    return `${getSiteUrl()}/instagram/connect`;
  },
};
