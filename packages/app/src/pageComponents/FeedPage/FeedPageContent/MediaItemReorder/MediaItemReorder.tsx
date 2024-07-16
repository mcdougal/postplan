import { getMediaItems } from '@/common/plannedPosts';
import { PlannedPost } from '@/server/plannedPosts';
import { TrashIcon } from '@heroicons/react/24/outline';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

import { IconButton } from '@/app/components';

type Props = {
  thumbnailUrlByMediaItemId: Map<string, string>;
  plannedPost: PlannedPost;
};

const MediaItemReorder = ({
  plannedPost,
  thumbnailUrlByMediaItemId,
}: Props): React.ReactElement => {
  return (
    <div className="flex gap-1">
      {getMediaItems(plannedPost).map((mediaItem) => {
        const thumbnailUrl = thumbnailUrlByMediaItemId.get(mediaItem.id);

        return (
          <div key={mediaItem.id} className="group relative cursor-grab">
            <div className="relative h-[64px] w-[64px] overflow-hidden rounded-lg bg-gray-100">
              {thumbnailUrl && (
                <Image
                  alt={plannedPost.caption || `Planned post thumbnail`}
                  fill
                  src={thumbnailUrl}
                  style={{ objectFit: `cover`, objectPosition: `center` }}
                />
              )}
            </div>
            <div className="absolute right-1 top-1 flex items-center justify-center rounded-full bg-black bg-opacity-30 opacity-0 group-hover:opacity-100">
              <IconButton
                className="text-white"
                icon={XCircleIcon}
                label="Remove"
                onClick={() => {
                  // todo
                }}
                size="lg">
                <TrashIcon className="h-3 w-3" />
              </IconButton>
            </div>
          </div>
        );
      })}
      <button className="flex h-[64px] w-[64px] items-center justify-center">
        <PlusCircleIcon className="h-8 w-8 text-white" />
      </button>
    </div>
  );
};

export default MediaItemReorder;
