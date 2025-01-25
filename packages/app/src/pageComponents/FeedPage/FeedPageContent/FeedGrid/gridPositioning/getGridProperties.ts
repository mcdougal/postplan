type GridProperties = {
  gapSize: number;
  itemSize: { height: number; width: number };
  numColumns: number;
};

export default (aspectRatio: 'square' | 'rectangle'): GridProperties => {
  return {
    gapSize: 1,
    itemSize:
      aspectRatio === `square`
        ? { height: 106, width: 106 }
        : { height: 141, width: 106 },
    numColumns: 3,
  };
};
