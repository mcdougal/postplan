'use client';

import { CurrentUser } from '@/common/users';
import { PlannedPost } from '@/server/plannedPosts';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { Textarea } from '@/app/components';

import { CarouselSizes } from '../getCarouselSizes';

import HashtagFinder from './HashtagFinder';
import PlannedPostEditorActions from './PlannedPostEditorActions';
import useUpdateCaptionRequest from './useUpdateCaptionRequest';

type Props = {
  carouselSizes: CarouselSizes;
  currentUser: CurrentUser;
  plannedPost: PlannedPost;
  setOptimisticPlannedPosts: Dispatch<SetStateAction<Array<PlannedPost>>>;
};

const PlannedPostEditor = ({
  carouselSizes,
  currentUser,
  plannedPost,
  setOptimisticPlannedPosts,
}: Props): React.ReactElement => {
  const [caption, setCaption] = useState(plannedPost.caption);
  const [isChanging, setIsChanging] = useState(false);
  const [isHashtagFinderOpen, setIsHashtagFinderOpen] = useState(false);
  const captionContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCaption(plannedPost.caption);
  }, [plannedPost.caption]);

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
    }, 500);

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
        ref={captionContainerRef}
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
      <PlannedPostEditorActions
        caption={caption}
        currentUser={currentUser}
        onOpenHashtagFinder={() => {
          setIsHashtagFinderOpen(true);
        }}
        plannedPost={plannedPost}
        setOptimisticPlannedPosts={setOptimisticPlannedPosts}
      />
      <HashtagFinder
        onClose={() => {
          setIsHashtagFinderOpen(false);
        }}
        onUpdateCaption={async (plannedPostId, newCaption) => {
          await updateCaption(plannedPostId, newCaption);
          if (captionContainerRef.current) {
            captionContainerRef.current.scrollTo(0, 99999999);
          }
        }}
        open={isHashtagFinderOpen}
        plannedPost={plannedPost}
      />
    </div>
  );
};

export default PlannedPostEditor;
