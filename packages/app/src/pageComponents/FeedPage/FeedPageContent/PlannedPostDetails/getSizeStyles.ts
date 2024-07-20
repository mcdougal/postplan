import { CSSProperties } from 'react';

export type SizeStyles = {
  container: CSSProperties;
  image: CSSProperties;
};

export default (
  resolution: { height: number; width: number } | null
): SizeStyles => {
  const heightStyle = `calc(100vh - 168px)`;

  if (resolution && resolution.height < resolution.width) {
    const containerAspectRatio = 0.75;
    const imageAspectRatio = resolution.width / resolution.height;

    const containerStyles = {
      aspectRatio: containerAspectRatio,
      height: heightStyle,
      maxHeight: `600px`,
    };

    const imageStyles = {
      aspectRatio: imageAspectRatio,
      height: `calc((${heightStyle} * 0.75) / ${imageAspectRatio})`,
      maxHeight: `600px`,
    };

    return {
      container: containerStyles,
      image: imageStyles,
    };
  }

  const containerStyles = {
    aspectRatio: resolution ? resolution.width / resolution.height : 0.75,
    height: heightStyle,
    maxHeight: `600px`,
  };

  return {
    container: containerStyles,
    image: containerStyles,
  };
};
