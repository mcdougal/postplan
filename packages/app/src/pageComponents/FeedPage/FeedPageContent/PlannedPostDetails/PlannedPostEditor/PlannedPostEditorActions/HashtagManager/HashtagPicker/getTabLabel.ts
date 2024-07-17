import { TabName } from './types';

export default (tabName: TabName): string => {
  const labelByTabName: { [key in TabName]: string } = {
    groups: `Groups`,
    mostUsed: `Most Used`,
    recent: `Recent`,
    suggested: `Suggested`,
  };

  return labelByTabName[tabName];
};
