import getRequiredEnvVar from './getRequiredEnvVar';

export default (): string => {
  return getRequiredEnvVar(`SITE_URL`);
};
