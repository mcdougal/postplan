type GridProperties = {
  gapSize: number;
  itemSize: { height: number; width: number };
  numColumns: number;
};

export default (): GridProperties => {
  return {
    gapSize: 1,
    itemSize: { height: 141, width: 106 },
    numColumns: 3,
  };
};
