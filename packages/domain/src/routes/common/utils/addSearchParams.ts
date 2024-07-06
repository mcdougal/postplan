export default (
  path: string,
  data: Record<string, unknown | undefined>
): string => {
  const query: Record<string, string> = {};

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      query[key] = `${value}`;
    }
  });

  if (Object.keys(query).length === 0) {
    return path;
  }

  const queryString = new URLSearchParams(query).toString();

  return `${path}?${queryString}`;
};
