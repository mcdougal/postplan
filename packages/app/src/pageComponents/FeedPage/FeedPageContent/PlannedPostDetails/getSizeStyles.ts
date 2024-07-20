import { CSSProperties } from 'react';

export default (
  resolution: { height: number; width: number } | null
): CSSProperties => {
  const aspectRatio = resolution ? resolution.width / resolution.height : 0.75;

  return {
    aspectRatio,
    height: `calc(100vh - 168px)`,
    maxHeight: `600px`,
  };
};
