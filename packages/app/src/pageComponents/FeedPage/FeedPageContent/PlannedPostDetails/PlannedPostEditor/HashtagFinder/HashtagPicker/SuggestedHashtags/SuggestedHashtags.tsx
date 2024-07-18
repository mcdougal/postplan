'use client';

import { PlannedPost } from '@/server/plannedPosts';

import {
  CheckboxButton,
  Spinner,
  TextLink,
  Typography,
} from '@/app/components';

import useSuggestHashtagsRequest from './useSuggestHashtagsRequest';

type OnUpdateHashtags = (
  updates: Array<{ hashtag: string; selected: boolean }>
) => void;

type Props = {
  isSelected: boolean;
  onUpdateHashtags: OnUpdateHashtags;
  plannedPost: PlannedPost;
  selectedHashtags: Set<string>;
};

const SuggestedHashtags = ({
  isSelected,
  onUpdateHashtags,
  plannedPost,
  selectedHashtags,
}: Props): React.ReactElement | null => {
  const { loading, suggestedHashtags } = useSuggestHashtagsRequest(
    plannedPost.caption,
    {
      skip: !isSelected,
    }
  );

  if (!isSelected) {
    return null;
  }

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Spinner size={6} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-1 p-2">
        {suggestedHashtags.map((suggestedHashtag) => {
          const isChecked = selectedHashtags.has(suggestedHashtag);

          return (
            <CheckboxButton
              key={suggestedHashtag}
              checked={isChecked}
              label={suggestedHashtag}
              onChange={(event) => {
                event.currentTarget.blur();
                onUpdateHashtags([
                  { hashtag: suggestedHashtag, selected: !isChecked },
                ]);
              }}
              size="xs"
            />
          );
        })}
      </div>
      <div className="flex items-center justify-end gap-2 px-3 py-1">
        <TextLink
          as="button"
          onClick={(): void => {
            onUpdateHashtags(
              suggestedHashtags.map((suggestedHashtag) => {
                return { hashtag: suggestedHashtag, selected: false };
              })
            );
          }}>
          <Typography size="xs">Remove All</Typography>
        </TextLink>
        <TextLink
          as="button"
          onClick={(): void => {
            onUpdateHashtags(
              suggestedHashtags.map((suggestedHashtag) => {
                return { hashtag: suggestedHashtag, selected: true };
              })
            );
          }}>
          <Typography size="xs">Add All</Typography>
        </TextLink>
      </div>
    </div>
  );
};

export default SuggestedHashtags;
