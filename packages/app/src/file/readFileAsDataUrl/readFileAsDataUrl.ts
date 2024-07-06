export default (imageFile: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();

      reader.addEventListener(`load`, (): void => {
        const dataUrl = reader.result;

        if (typeof dataUrl === `string`) {
          resolve(dataUrl);
        } else {
          reject(new Error(`Failed to load image`));
        }
      });

      reader.readAsDataURL(imageFile);
    } catch (err) {
      reject(err);
    }
  });
};
