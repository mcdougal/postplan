'use client';

import { CurrentUser } from '@/common/users';
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';

import { Typography } from '@/app/components';

import { Post } from '../types';

import makePostForFile from './makePostForFile';
import PostPreview from './PostPreview';
import useDragAndDrop from './useDragAndDrop';
import useUploadFileRequest from './useUploadFileRequest';

type Props = {
  currentUser: CurrentUser;
  posts: Array<Post>;
  setPosts: Dispatch<SetStateAction<Array<Post>>>;
};

const DragAndDrop = ({
  currentUser,
  posts,
  setPosts,
}: Props): React.ReactElement => {
  const uploadFileRequest = useUploadFileRequest();

  const dragAndDrop = useDragAndDrop(async (files) => {
    const newPosts = await Promise.all(files.map(makePostForFile));

    setPosts((prevPosts) => {
      return [...prevPosts, ...newPosts];
    });

    await Promise.all(
      newPosts.map(async (newPost) => {
        const result = await uploadFileRequest.uploadFile(
          currentUser.id,
          newPost.file
        );

        setPosts((prevPosts) => {
          return prevPosts.map((prevPost) => {
            return prevPost.id === newPost.id
              ? { ...prevPost, uploadingStatus: result.status }
              : prevPost;
          });
        });
      })
    );
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
                  setPosts(newPosts);
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
