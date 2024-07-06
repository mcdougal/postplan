/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { ImageLoader } from 'next/image';

const cloudinaryLoader: ImageLoader = ({ quality, src, width }) => {
  if (!src.startsWith(`/`)) {
    return src;
  }

  const params = [`f_auto`, `c_limit`, `w_${width}`, `q_${quality || `auto`}`];
  const paramsString = params.join(`,`);
  const srcNormalized = src.replace(/^\//, ``);
  const srcRoot = srcNormalized.split(`/`).slice(0, 1)[0];
  const srcImage = srcNormalized.split(`/`).slice(1).join(`/`);

  return `https://res.cloudinary.com/cedricmcdougal/image/${srcRoot}/${paramsString}/${srcImage}`;
};

export default cloudinaryLoader;
