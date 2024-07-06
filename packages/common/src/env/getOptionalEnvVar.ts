import getNextPublicEnvVar from './getNextPublicEnvVar';

export default (envVarName: string): string | null => {
  const nextPublicValue = getNextPublicEnvVar(envVarName);

  const value =
    nextPublicValue !== undefined ? nextPublicValue : process.env[envVarName];

  return value ?? null;
};
