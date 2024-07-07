/* eslint-disable no-restricted-syntax */

import getDataUrlMimeType from '../getDataUrlMimeType';

export default (dataUrl: string, fileName: string): File => {
  const byteString = atob(dataUrl.split(`,`)[1]);
  const mimeType = getDataUrlMimeType(dataUrl);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ab], { type: mimeType });

  return new File([blob], fileName, { type: mimeType });
};
