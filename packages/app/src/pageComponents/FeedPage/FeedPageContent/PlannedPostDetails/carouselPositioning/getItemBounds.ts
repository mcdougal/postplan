import getCarouselProperties from './getCarouselProperties';

type Args = {
  index: number;
};

type ItemBounds = {
  height: number;
  width: number;
  x: number;
  y: number;
};

export default ({ index }: Args): ItemBounds => {
  const { itemSize } = getCarouselProperties();

  const height = itemSize;
  const width = itemSize;
  const x = itemSize * index;
  const y = 0;

  return {
    height,
    width,
    x,
    y,
  };
};
