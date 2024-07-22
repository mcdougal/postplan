import { getSiteUrl } from '@/common/env';

export default {
  getPath: (): string => {
    return `/feed`;
  },
  getAbsoluteUrl: (): string => {
    return `${getSiteUrl()}/feed`;
  },
};
