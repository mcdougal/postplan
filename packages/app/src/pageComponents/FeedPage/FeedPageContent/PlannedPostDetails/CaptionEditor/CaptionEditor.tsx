import { CurrentUser } from '@/common/users';
import { PlannedPost } from '@/server/plannedPosts';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Textarea } from '@/app/components';

import { CarouselSizes } from '../getCarouselSizes';

import CaptionCountdown from './CaptionCountdown';
import getNumChars from './getNumChars';
import getNumHashtags from './getNumHashtags';
import getNumTags from './getNumTags';
import useUpdateCaptionRequest from './useUpdateCaptionRequest';

type Props = {
  carouselSizes: CarouselSizes;
  currentUser: CurrentUser;
  plannedPost: PlannedPost;
  setOptimisticPlannedPosts: Dispatch<SetStateAction<Array<PlannedPost>>>;
};

const CaptionEditor = ({
  carouselSizes,
  currentUser,
  plannedPost,
  setOptimisticPlannedPosts,
}: Props): React.ReactElement => {
  const [caption, setCaption] = useState(plannedPost.caption);
  const [isChanging, setIsChanging] = useState(false);
  const { updateCaption } = useUpdateCaptionRequest(
    currentUser,
    setOptimisticPlannedPosts
  );

  useEffect(() => {
    if (!isChanging) {
      return;
    }

    const timeout = setTimeout(() => {
      updateCaption(plannedPost.id, caption || ``);
      setIsChanging(false);
    }, 2000);

    return (): void => {
      clearTimeout(timeout);
    };
  }, [caption, updateCaption, plannedPost.id, isChanging]);

  return (
    <div
      className="relative flex-1"
      style={{
        height: `${carouselSizes.container.height}px`,
      }}>
      <div
        className="overflow-auto px-6 py-4"
        style={{
          height: `${carouselSizes.container.height - 48}px`,
        }}>
        <Textarea
          onChange={(event) => {
            setCaption(event.target.value || null);
            setIsChanging(true);
          }}
          placeholder="Write a caption..."
          rows={10}
          value={caption || ``}
        />
      </div>
      <div className="flex h-12 items-center gap-2 bg-white pl-6 pr-3">
        <CaptionCountdown count={getNumHashtags(caption)} label="#" max={30} />
        <CaptionCountdown count={getNumTags(caption)} label="@" max={20} />
        <CaptionCountdown count={getNumChars(caption)} label="Abc" max={2200} />
      </div>
    </div>
  );
};

export default CaptionEditor;
