type GridProperties = {
  gapSize: number;
  itemSize: number;
  numColumns: number;
};

export default (): GridProperties => {
  return {
    gapSize: 1,
    itemSize: 106,
    numColumns: 3,
  };
};
