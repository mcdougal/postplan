export default (
  searchParams: URLSearchParams,
  paramName: string
): Record<string, unknown> | undefined => {
  const paramRaw = searchParams.get(paramName);
  const param = paramRaw ? JSON.parse(paramRaw) : undefined;

  return param;
};
