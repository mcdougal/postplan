'use client';

import { PlannedPost } from '@/server/plannedPosts';

import { CheckboxButton, Spinner } from '@/app/components';

import useSuggestHashtagsRequest from './useSuggestHashtagsRequest';

type Props = {
  isSelected: boolean;
  plannedPost: PlannedPost;
};

const SuggestedHashtags = ({
  isSelected,
  plannedPost,
}: Props): React.ReactElement | null => {
  const suggestedHashtagsRequest = useSuggestHashtagsRequest(
    plannedPost.caption,
    {
      skip: !isSelected,
    }
  );

  if (!isSelected) {
    return null;
  }

  if (suggestedHashtagsRequest.loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Spinner size={6} />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-1 p-2">
      {suggestedHashtagsRequest.suggestedHashtags.map((suggestedHashtag) => {
        return (
          <CheckboxButton
            key={suggestedHashtag}
            checked={false}
            label={suggestedHashtag}
            onChange={() => {
              //
            }}
            size="xs"
          />
        );
      })}
    </div>
  );
};

export default SuggestedHashtags;
