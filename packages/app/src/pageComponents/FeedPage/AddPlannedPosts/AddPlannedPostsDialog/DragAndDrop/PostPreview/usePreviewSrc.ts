import { useEffect, useState } from 'react';

import { readFileAsDataUrl } from '@/app/file';

import { Post } from '../../types';

export default (post: Post): string | null => {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  useEffect(() => {
    const run = async (): Promise<void> => {
      setPreviewSrc(await readFileAsDataUrl(post.file));
    };
    run();
  }, [post]);

  return previewSrc;
};
