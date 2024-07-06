import { useEffect, useState } from 'react';

import { Post } from '../../types';

export default (post: Post): string | null => {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  useEffect(() => {
    const reader = new FileReader();

    reader.addEventListener(`load`, (): void => {
      const src = reader.result;
      setPreviewSrc(typeof src === `string` ? src : null);
    });

    reader.readAsDataURL(post.file);
  }, [post]);

  return previewSrc;
};
