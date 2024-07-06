import getNextPublicEnvVar from './getNextPublicEnvVar';

export default (envVarName: string): string => {
  const nextPublicValue = getNextPublicEnvVar(envVarName);

  const value =
    nextPublicValue !== undefined ? nextPublicValue : process.env[envVarName];

  if (!value) {
    throw new Error(`Missing environment variable: ${envVarName}`);
  }

  return value;
};
