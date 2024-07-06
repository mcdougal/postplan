export default (
  searchParams: URLSearchParams,
  paramName: string
): number | undefined => {
  const paramRaw = searchParams.get(paramName);
  const paramInt = paramRaw ? parseInt(paramRaw, 10) : undefined;
  const param = Number.isInteger(paramInt) ? paramInt : undefined;

  return param;
};
