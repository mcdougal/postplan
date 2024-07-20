const HEIGHT_BASIS = 600;

export type CarouselSizes = {
  container: { height: number; width: number };
  image: { height: number; width: number };
};

export default (
  resolution: { height: number; width: number } | null
): CarouselSizes => {
  if (resolution === null) {
    return {
      container: { height: HEIGHT_BASIS, width: HEIGHT_BASIS * 0.75 },
      image: { height: HEIGHT_BASIS, width: HEIGHT_BASIS * 0.75 },
    };
  }

  const containerHeight = HEIGHT_BASIS;
  const aspectRatio = resolution.width / resolution.height;

  if (resolution.height < resolution.width) {
    const containerWidth = containerHeight * 0.75;

    return {
      container: {
        height: containerHeight,
        width: containerWidth,
      },
      image: {
        height: containerWidth / aspectRatio,
        width: containerWidth,
      },
    };
  }

  return {
    container: {
      height: containerHeight,
      width: containerHeight * aspectRatio,
    },
    image: {
      height: containerHeight,
      width: containerHeight * aspectRatio,
    },
  };
};
