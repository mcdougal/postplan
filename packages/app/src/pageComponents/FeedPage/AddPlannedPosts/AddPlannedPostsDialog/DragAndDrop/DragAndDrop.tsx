'use client';

import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

import { Typography } from '@/app/components';

import { Post } from '../types';

import makePostForFile from './makePostForFile';
import PostPreview from './PostPreview';
import useDragAndDrop from './useDragAndDrop';

type Props = {
  onPostsChange: (posts: Array<Post>) => void;
  posts: Array<Post>;
};

const DragAndDrop = ({ onPostsChange, posts }: Props): React.ReactElement => {
  const dragAndDrop = useDragAndDrop(async (files) => {
    const newPosts = await Promise.all(files.map(makePostForFile));
    onPostsChange([...posts, ...newPosts]);
  });

  return (
    <div
      {...dragAndDrop.handlers}
      className={twMerge(
        `flex min-h-52 rounded-lg border-2 border-dashed`,
        dragAndDrop.isDragOver ? `border-blue-500` : `border-gray-200`
      )}>
      {posts.length === 0 ? (
        <div className="m-auto flex flex-col items-center gap-3 self-center">
          <ArrowUpOnSquareIcon className="h-10 w-10 text-blue-400" />
          <Typography size="md">Drag & Drop to upload</Typography>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3 p-3">
          {posts.map((post) => {
            return (
              <PostPreview
                key={post.id}
                onRemove={() => {
                  const newPosts = posts.filter((p) => {
                    return p.id !== post.id;
                  });
                  onPostsChange(newPosts);
                }}
                post={post}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;
