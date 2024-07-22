import { getSiteUrl } from '@/common/env';

export default {
  getPath: (): string => {
    return `/login`;
  },
  getAbsoluteUrl: (): string => {
    return `${getSiteUrl()}/login`;
  },
};
