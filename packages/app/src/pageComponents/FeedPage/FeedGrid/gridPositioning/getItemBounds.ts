import getGridProperties from './getGridProperties';

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
  const { gapSize, itemSize, numColumns } = getGridProperties();

  const row = Math.floor(index / numColumns);
  const column = index % numColumns;

  const height = itemSize;
  const width = itemSize;
  const x = column * (itemSize + gapSize);
  const y = row * (itemSize + gapSize);

  return {
    height,
    width,
    x,
    y,
  };
};
