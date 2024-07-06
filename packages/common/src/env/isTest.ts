import getRequiredEnvVar from './getRequiredEnvVar';

export default (): boolean => {
  return getRequiredEnvVar(`NODE_ENV`) === `test`;
};
