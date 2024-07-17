import getPositioningProperties from './getPositioningProperties';

type Args = {
  numItems: number;
};

type GridSize = {
  height: number;
  width: number;
};

export default ({ numItems }: Args): GridSize => {
  const { gapSize, itemSize } = getPositioningProperties();

  const height = itemSize;
  const width = (itemSize + gapSize) * numItems - gapSize;

  return {
    height,
    width,
  };
};
