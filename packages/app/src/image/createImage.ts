export default async (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.addEventListener(`load`, (): void => {
      resolve(image);
    });

    image.addEventListener(`error`, (err): void => {
      reject(err);
    });

    image.src = src;
  });
};
