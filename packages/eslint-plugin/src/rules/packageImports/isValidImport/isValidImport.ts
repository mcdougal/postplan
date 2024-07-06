import matchesSomePattern from './matchesSomePattern';

export default (
  allowedPatterns: Array<string>,
  disallowedPatterns: Array<string>,
  importPath: string
): boolean => {
  if (
    allowedPatterns.length > 0 &&
    matchesSomePattern(allowedPatterns, importPath)
  ) {
    return true;
  }

  if (disallowedPatterns.length > 0) {
    return !matchesSomePattern(disallowedPatterns, importPath);
  }

  return true;
};
