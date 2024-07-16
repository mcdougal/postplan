import getGridProperties from './getGridProperties';

type Args = {
  numItems: number;
};

type GridSize = {
  height: number;
  width: number;
};

export default ({ numItems }: Args): GridSize => {
  const { gapSize, itemSize, numColumns } = getGridProperties();

  const numRows = Math.ceil(numItems / numColumns);
  const height = numRows * itemSize + (numRows - 1) * gapSize;
  const width = numColumns * itemSize + (numColumns - 1) * gapSize;

  return {
    height,
    width,
  };
};
