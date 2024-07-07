export default (dataUrl: string): string => {
  return dataUrl.split(`,`)[0].split(`:`)[1].split(`;`)[0];
};
