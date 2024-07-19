import getHashtagRegex from '../getHashtagRegex';

export default (string: string): Array<string> => {
  return string.match(getHashtagRegex()) || [];
};
