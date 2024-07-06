import isProduction from './isProduction';

export default (): string => {
  return isProduction()
    ? `https://instaplan.vercel.app`
    : `http://localhost:3000`;
};
