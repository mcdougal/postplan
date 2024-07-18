import { getRequiredEnvVar } from '@/common/env';

import getInstagramOAuthRedirectUri from '../getInstagramOAuthRedirectUri';

export default (): string => {
  return `https://api.instagram.com/oauth/authorize?${[
    `client_id=${getRequiredEnvVar(`INSTAGRAM_APP_ID`)}`,
    `redirect_uri=${getInstagramOAuthRedirectUri()}`,
    `response_type=code`,
    `scope=user_profile,user_media`,
  ].join(`&`)}`;
};
