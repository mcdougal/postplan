import getCarouselProperties from './getCarouselProperties';

type Args = {
  numItems: number;
};

type GridSize = {
  height: number;
  width: number;
};

export default ({ numItems }: Args): GridSize => {
  const { itemSize } = getCarouselProperties();

  const height = itemSize;
  const width = itemSize * numItems;

  return {
    height,
    width,
  };
};
