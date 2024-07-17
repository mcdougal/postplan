import { CurrentUser } from '@/common/users';
import { PlannedPost } from '@/server/plannedPosts';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Textarea } from '@/app/components';

import { CarouselSizes } from '../getCarouselSizes';

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
    }, 1000);

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
      <PlannedPostEditorActions
        caption={caption}
        currentUser={currentUser}
        plannedPost={plannedPost}
        setOptimisticPlannedPosts={setOptimisticPlannedPosts}
      />
    </div>
  );
};

export default PlannedPostEditor;
