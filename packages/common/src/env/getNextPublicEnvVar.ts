/**
 * Environment variables that are public within Next.js.
 *
 * Build-time environment variables in Next.js cannot be accessed dynamically
 * so we have to keep a hard-coded map of them.
 */
const NEXT_PUBLIC_ENV_VARS = {
  NODE_ENV: process.env.NODE_ENV,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasKey = <O extends object>(obj: O, key: keyof any): key is keyof O => {
  return key in obj;
};

export default (envVarName: string): string | null | undefined => {
  if (hasKey(NEXT_PUBLIC_ENV_VARS, envVarName)) {
    return NEXT_PUBLIC_ENV_VARS[envVarName] || null;
  }

  return undefined;
};
