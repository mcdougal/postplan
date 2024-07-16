import getPositioningProperties from './getPositioningProperties';

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
  const { gapSize, itemSize } = getPositioningProperties();

  const height = itemSize;
  const width = itemSize;
  const x = index * (itemSize + gapSize);
  const y = 0;

  return {
    height,
    width,
    x,
    y,
  };
};
