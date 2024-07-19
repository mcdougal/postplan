'use client';

import { PlannedPost } from '@/server/plannedPosts';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Button, Spinner, TextLink, Typography } from '@/app/components';

import HashtagOptions from '../HashtagOptions';

import AddOrEditHashtagGroupDialog, {
  AddOrEditDialogAction,
} from './AddOrEditHashtagGroupDialog';
import useHashtagGroupsRequest from './useHashtagGroupsRequest';

type OnUpdateHashtags = (
  updates: Array<{ hashtag: string; selected: boolean }>
) => void;

type Props = {
  isSelected: boolean;
  onUpdateHashtags: OnUpdateHashtags;
  plannedPost: PlannedPost;
  selectedHashtags: Set<string>;
};

const HashtagGroups = ({
  isSelected,
  onUpdateHashtags,
  plannedPost,
  selectedHashtags,
}: Props): React.ReactElement | null => {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [isAddOrEditDialogOpen, setIsAddOrEditDialogOpen] = useState(false);
  const [addOrEditDialogAction, setAddOrEditDialogAction] =
    useState<AddOrEditDialogAction>({ status: `add` });

  const hashtagGroupsRequest = useHashtagGroupsRequest(plannedPost.userId, {
    skip: !isSelected,
  });

  if (!isSelected) {
    return null;
  }

  const selectedGroup = hashtagGroupsRequest.hashtagGroups.find((group) => {
    return group.id === selectedGroupId;
  });

  return (
    <>
      <div className="flex flex-1">
        <div className="border-r border-gray-200">
          <div className="w-[140px]">
            {hashtagGroupsRequest.loading ? (
              <div className="flex justify-center pt-10">
                <Spinner size={6} />
              </div>
            ) : (
              <>
                <div className="p-2">
                  <Button
                    className="w-full"
                    color="secondary"
                    onClick={() => {
                      setAddOrEditDialogAction({ status: `add` });
                      setIsAddOrEditDialogOpen(true);
                    }}
                    size="md">
                    + Add Group
                  </Button>
                </div>
                {hashtagGroupsRequest.hashtagGroups.map((hashtagGroup) => {
                  const isGroupSelected = selectedGroupId === hashtagGroup.id;

                  return (
                    <button
                      key={hashtagGroup.id}
                      className={twMerge(
                        `block w-full min-w-24 px-3 py-2 text-left leading-4`,
                        isGroupSelected && `bg-gray-100`
                      )}
                      onClick={() => {
                        setSelectedGroupId(hashtagGroup.id);
                      }}>
                      <Typography size="sm">
                        {hashtagGroup.displayName}
                      </Typography>
                    </button>
                  );
                })}
              </>
            )}
          </div>
        </div>
        <HashtagOptions
          extraAction={
            selectedGroup && (
              <TextLink
                as="button"
                onClick={(): void => {
                  setIsAddOrEditDialogOpen(true);
                  setAddOrEditDialogAction({
                    status: `edit`,
                    group: selectedGroup,
                  });
                }}>
                <Typography size="xs">Edit Group</Typography>
              </TextLink>
            )
          }
          hashtags={selectedGroup?.hashtags || []}
          onUpdateHashtags={onUpdateHashtags}
          selectedHashtags={selectedHashtags}
        />
      </div>
      <AddOrEditHashtagGroupDialog
        action={addOrEditDialogAction}
        onClose={() => {
          setIsAddOrEditDialogOpen(false);
        }}
        onGroupCreated={(createdGroup) => {
          hashtagGroupsRequest.setHashtagGroups((prevGroups) => {
            return [createdGroup, ...prevGroups];
          });
          setSelectedGroupId(createdGroup.id);
        }}
        onGroupUpdated={(updatedGroup) => {
          hashtagGroupsRequest.setHashtagGroups((prevGroups) => {
            return prevGroups.map((group) => {
              return group.id === updatedGroup.id ? updatedGroup : group;
            });
          });
        }}
        open={isAddOrEditDialogOpen}
        plannedPost={plannedPost}
      />
    </>
  );
};

export default HashtagGroups;
