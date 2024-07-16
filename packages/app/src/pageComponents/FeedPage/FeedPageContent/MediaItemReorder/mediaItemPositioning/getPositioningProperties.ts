type PositioningProperties = {
  gapSize: number;
  itemSize: number;
};

export default (): PositioningProperties => {
  return {
    gapSize: 4,
    itemSize: 64,
  };
};
