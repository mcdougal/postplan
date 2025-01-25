import getGridProperties from './getGridProperties';

type Args = {
  aspectRatio: 'square' | 'rectangle';
  numItems: number;
};

type GridSize = {
  height: number;
  width: number;
};

export default ({ aspectRatio, numItems }: Args): GridSize => {
  const { gapSize, itemSize, numColumns } = getGridProperties(aspectRatio);

  const numRows = Math.ceil(numItems / numColumns);
  const height = numRows * itemSize.height + (numRows - 1) * gapSize;
  const width = numColumns * itemSize.width + (numColumns - 1) * gapSize;

  return {
    height,
    width,
  };
};
