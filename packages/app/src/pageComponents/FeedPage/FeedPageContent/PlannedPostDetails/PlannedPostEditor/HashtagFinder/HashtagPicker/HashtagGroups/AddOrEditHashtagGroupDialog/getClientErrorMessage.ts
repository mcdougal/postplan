export default (
  displayName: string,
  hashtags: Array<string>
): string | null => {
  if (!displayName) {
    return `Pick a name for your group`;
  }

  if (hashtags.length === 0) {
    return `Enter at least one hashtag`;
  }

  return null;
};
