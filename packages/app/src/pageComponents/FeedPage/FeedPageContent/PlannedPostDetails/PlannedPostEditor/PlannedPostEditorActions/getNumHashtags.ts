export default (caption: string | null): number => {
  if (!caption) {
    return 0;
  }

  return (caption.match(/#[^ ]+/g) || []).length;
};
