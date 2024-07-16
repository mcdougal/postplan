type CarouselProperties = {
  itemSize: { height: number; width: number };
};

export default (): CarouselProperties => {
  return {
    itemSize: { height: 620, width: 496 },
  };
};
