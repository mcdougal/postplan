import { getRequiredEnvVar } from '@/common/env';
import { InstagramOAuthRoute } from '@/common/routes';

type Args = {
  state: string;
};

export default (args: Args): string => {
  const searchParams = new URLSearchParams({
    client_id: getRequiredEnvVar(`INSTAGRAM_APP_ID`),
    redirect_uri: InstagramOAuthRoute.getAbsoluteUrl(),
    response_type: `code`,
    scope: `instagram_business_basic`,
    state: args.state,
  });

  return `https://www.instagram.com/oauth/authorize?${searchParams.toString()}`;
};
