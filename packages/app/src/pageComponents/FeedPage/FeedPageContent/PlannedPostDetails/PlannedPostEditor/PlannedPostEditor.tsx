'use client';

import { PlannedPost } from '@/server/plannedPosts';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { Textarea } from '@/app/components';

import { SizeStyles } from '../getSizeStyles';
import { Carousel } from '../useCarousel';

import HashtagFinder from './HashtagFinder';
import PlannedPostEditorActions from './PlannedPostEditorActions';
import useUpdateCaptionRequest from './useUpdateCaptionRequest';

type Props = {
  carousel: Carousel;
  plannedPost: PlannedPost;
  setOptimisticPlannedPosts: Dispatch<SetStateAction<Array<PlannedPost>>>;
  sizeStyles: SizeStyles;
};

const PlannedPostEditor = ({
  carousel,
  plannedPost,
  setOptimisticPlannedPosts,
  sizeStyles,
}: Props): React.ReactElement => {
  const [caption, setCaption] = useState(plannedPost.caption);
  const [isChanging, setIsChanging] = useState(false);
  const [isHashtagFinderOpen, setIsHashtagFinderOpen] = useState(false);
  const captionContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCaption(plannedPost.caption);
  }, [plannedPost.caption]);

  const { updateCaption } = useUpdateCaptionRequest(setOptimisticPlannedPosts);

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
        height: sizeStyles.container.height,
        maxHeight: sizeStyles.container.maxHeight,
      }}>
      <div
        ref={captionContainerRef}
        className="overflow-auto px-6 pb-4 pt-5"
        style={{
          height: `calc(${sizeStyles.container.height} - 48px)`,
          maxHeight: `calc(${sizeStyles.container.maxHeight} - 48px)`,
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
        carousel={carousel}
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
