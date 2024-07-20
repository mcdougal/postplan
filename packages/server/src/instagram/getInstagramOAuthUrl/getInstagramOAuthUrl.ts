import { getRequiredEnvVar } from '@/common/env';
import { InstagramOAuthRoute } from '@/common/routes';

export default (): string => {
  return `https://api.instagram.com/oauth/authorize?${[
    `client_id=${getRequiredEnvVar(`INSTAGRAM_APP_ID`)}`,
    `redirect_uri=${InstagramOAuthRoute.getAbsoluteUrl({})}`,
    `response_type=code`,
    `scope=user_profile,user_media`,
  ].join(`&`)}`;
};
