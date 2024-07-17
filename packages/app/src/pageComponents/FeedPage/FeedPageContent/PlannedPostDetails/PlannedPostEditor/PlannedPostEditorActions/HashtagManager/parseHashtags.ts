export default (caption: string | null): Array<string> => {
  if (!caption) {
    return [];
  }

  const hashtags = caption.match(/#[^ ]+/g) || [];
  const uniqueHashtags = Array.from(new Set(hashtags));

  return uniqueHashtags;
};
