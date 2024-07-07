'use client';

import { PlannedPost } from '@/server/plannedPosts';
import Image from 'next/image';

import useFileDownloadUrlRequest from './useFileDownloadUrlRequest';

type Props = {
  plannedPost: PlannedPost;
};

const PlannedFeedItem = ({ plannedPost }: Props): React.ReactElement => {
  const { data } = useFileDownloadUrlRequest(plannedPost);

  return (
    <div className="relative h-[106px] w-[106px] bg-gray-200">
      {data?.fileDownloadUrl && (
        <Image
          alt={plannedPost.caption || `Planned post thumbnail`}
          fill
          sizes="250px"
          src={data.fileDownloadUrl}
          style={{ objectFit: `cover`, objectPosition: `center` }}
          unoptimized
        />
      )}
    </div>
  );
};

export default PlannedFeedItem;
