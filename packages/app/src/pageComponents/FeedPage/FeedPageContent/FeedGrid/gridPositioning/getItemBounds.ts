import getGridProperties from './getGridProperties';

type Args = {
  aspectRatio: 'square' | 'rectangle';
  index: number;
};

type ItemBounds = {
  height: number;
  width: number;
  x: number;
  y: number;
};

export default ({ aspectRatio, index }: Args): ItemBounds => {
  const { gapSize, itemSize, numColumns } = getGridProperties(aspectRatio);

  const row = Math.floor(index / numColumns);
  const column = index % numColumns;

  const height = itemSize.height;
  const width = itemSize.width;
  const x = column * (itemSize.width + gapSize);
  const y = row * (itemSize.height + gapSize);

  return {
    height,
    width,
    x,
    y,
  };
};
