'use client';

import { PlannedPost } from '@/server/plannedPosts';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Typography } from '@/app/components';

import getTabLabel from './getTabLabel';
import HashtagGroups from './HashtagGroups';
import MostUsedHashtags from './MostUsedHashtags';
import RecentHashtags from './RecentHashtags';
import SuggestedHashtags from './SuggestedHashtags';
import { TabName } from './types';

type Props = {
  plannedPost: PlannedPost;
};

const HashtagPicker = ({ plannedPost }: Props): React.ReactElement => {
  const [selectedTabName, setSelectedTabName] = useState<TabName>(`groups`);

  const allTabNames: Array<TabName> = [
    `groups`,
    `recent`,
    `mostUsed`,
    `suggested`,
  ];

  return (
    <div className="flex border border-gray-200">
      <div className="border-r border-gray-200">
        {allTabNames.map((tabName) => {
          const isSelected = selectedTabName === tabName;

          return (
            <button
              key={tabName}
              className={twMerge(
                `block w-full min-w-24 px-2 py-2 text-left`,
                isSelected && `bg-gray-100`
              )}
              onClick={() => {
                setSelectedTabName(tabName);
              }}>
              <Typography size="sm" weight={isSelected ? `bold` : undefined}>
                {getTabLabel(tabName)}
              </Typography>
            </button>
          );
        })}
      </div>
      <div className="relative flex-1 overflow-auto">
        <HashtagGroups isSelected={selectedTabName === `groups`} />
        <MostUsedHashtags isSelected={selectedTabName === `mostUsed`} />
        <RecentHashtags isSelected={selectedTabName === `recent`} />
        <SuggestedHashtags
          isSelected={selectedTabName === `suggested`}
          plannedPost={plannedPost}
        />
      </div>
    </div>
  );
};

export default HashtagPicker;
