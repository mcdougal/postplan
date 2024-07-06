export default (fileName: string): string => {
  const [name, extension] = fileName.split(`.`);

  if (!extension) {
    return `${name}.thumbnail`;
  }

  return `${name}.thumbnail.${extension}`;
};
