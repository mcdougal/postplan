import { v4 as uuidv4 } from 'uuid';

import { Post } from '../types';

export default (file: File): Post => {
  const postId = uuidv4();
  const fileExtension = file.name.split(`.`).pop();
  const newFileName = fileExtension ? `${postId}.${fileExtension}` : postId;
  const renamedFile = new File([file], newFileName, { type: file.type });

  return {
    file: renamedFile,
    id: postId,
  };
};
