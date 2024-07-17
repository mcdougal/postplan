'use client';

import Image from 'next/image';

import { Button } from '@/app/components';

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
          />
        )}
      </div>
      <Button color="secondary" onClick={onRemove} size="xs">
        Remove
      </Button>
    </div>
  );
};

export default PostPreview;
