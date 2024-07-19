'use client';

import { twMerge } from 'tailwind-merge';

import {
  CheckboxButton,
  Spinner,
  TextLink,
  Typography,
} from '@/app/components';

type OnUpdateHashtags = (
  updates: Array<{ hashtag: string; selected: boolean }>
) => void;

type Props = {
  extraAction?: React.ReactElement;
  hashtags: Array<string>;
  loading?: boolean;
  onUpdateHashtags: OnUpdateHashtags;
  selectedHashtags: Set<string>;
};

const HashtagOptions = ({
  extraAction,
  hashtags,
  loading,
  onUpdateHashtags,
  selectedHashtags,
}: Props): React.ReactElement => {
  return (
    <div className="flex-1">
      {loading ? (
        <div className="flex h-[350px] items-center justify-center pb-10">
          <Spinner size={6} />
        </div>
      ) : (
        <div className="h-[350px] overflow-auto">
          <div className="flex flex-wrap items-start gap-1 p-2">
            {hashtags.map((hashtag) => {
              const isChecked = selectedHashtags.has(hashtag.toLowerCase());

              return (
                <CheckboxButton
                  key={hashtag}
                  checked={isChecked}
                  label={hashtag}
                  onChange={(event) => {
                    event.currentTarget.blur();
                    onUpdateHashtags([{ hashtag, selected: !isChecked }]);
                  }}
                  size="xs"
                />
              );
            })}
          </div>
        </div>
      )}
      <div
        className={twMerge(
          `flex items-center gap-2 px-3 py-1`,
          (loading || hashtags.length === 0) && `pointer-events-none invisible`
        )}>
        <div className="flex flex-1 items-center">{extraAction}</div>
        <TextLink
          as="button"
          onClick={(): void => {
            onUpdateHashtags(
              hashtags.map((hashtag) => {
                return { hashtag, selected: false };
              })
            );
          }}>
          <Typography size="xs">Remove All</Typography>
        </TextLink>
        <TextLink
          as="button"
          onClick={(): void => {
            onUpdateHashtags(
              hashtags.map((hashtag) => {
                return { hashtag, selected: true };
              })
            );
          }}>
          <Typography size="xs">Add All</Typography>
        </TextLink>
      </div>
    </div>
  );
};

export default HashtagOptions;
