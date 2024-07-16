import getCarouselProperties from './getCarouselProperties';

type GridSize = {
  height: number;
  width: number;
};

export default (): GridSize => {
  const { itemSize } = getCarouselProperties();

  const height = itemSize.height;
  const width = itemSize.width;

  return {
    height,
    width,
  };
};
