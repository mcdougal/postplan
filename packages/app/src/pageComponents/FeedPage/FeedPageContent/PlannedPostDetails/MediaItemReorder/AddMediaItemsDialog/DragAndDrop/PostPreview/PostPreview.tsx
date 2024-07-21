'use client';

import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

import { Button, Spinner, Typography } from '@/app/components';

import { Post } from '../../types';

import usePreviewSrc from './usePreviewSrc';

type Props = {
  onRemove: () => void;
  post: Post;
};

const PostPreview = ({ onRemove, post }: Props): React.ReactElement => {
  const previewSrc = usePreviewSrc(post);

  return (
    <div className="flex flex-col gap-1">
      <div className="relative h-[106px] w-[106px] overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
        {previewSrc && (
          <Image
            alt={post.file.name}
            fill
            src={previewSrc}
            style={{ objectFit: `cover`, objectPosition: `center` }}
            unoptimized
          />
        )}
        {post.uploadingStatus === `loading` && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
            <Spinner size={8} />
          </div>
        )}
        {post.uploadingStatus === `error` && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-20">
            <div>
              <div className="rounded-full bg-white">
                <ExclamationCircleIcon className="h-10 w-10 text-red-500" />
              </div>
              <Typography
                className="block rounded-md bg-white p-1 text-center leading-none"
                size="xs">
                Error
              </Typography>
            </div>
          </div>
        )}
      </div>
      <Button color="secondary" onClick={onRemove} size="xs">
        Remove
      </Button>
    </div>
  );
};

export default PostPreview;
