export default (file: File): boolean => {
  return file.type.startsWith(`image/`);
};
