import { InstagramOAuthRoute } from '@/common/routes';

export default (): string => {
  return InstagramOAuthRoute.getAbsoluteUrl({});
};
