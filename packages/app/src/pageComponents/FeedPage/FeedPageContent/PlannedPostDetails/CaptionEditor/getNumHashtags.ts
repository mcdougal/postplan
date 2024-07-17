export default (caption: string | null): number => {
  if (!caption) {
    return 0;
  }

  return (caption.match(/#[a-zA-Z0-9_-]+/g) || []).length;
};
