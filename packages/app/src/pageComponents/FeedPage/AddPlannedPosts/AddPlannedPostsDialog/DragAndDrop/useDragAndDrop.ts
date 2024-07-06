import { useState } from 'react';

type DragAndDrop = {
  isDragOver: boolean;
  handlers: {
    onDragEnter: (event: React.DragEvent) => void;
    onDragLeave: (event: React.DragEvent) => void;
    onDragOver: (event: React.DragEvent) => void;
    onDrop: (event: React.DragEvent) => void;
  };
};

type OnDropFilesCallback = (files: Array<File>) => void;

export default (onDropFiles: OnDropFilesCallback): DragAndDrop => {
  const [isDragOver, setIsDragOver] = useState(false);

  const onDragEnter: DragAndDrop['handlers']['onDragEnter'] = () => {
    setIsDragOver(true);
  };

  const onDragLeave: DragAndDrop['handlers']['onDragLeave'] = () => {
    setIsDragOver(false);
  };

  const onDragOver: DragAndDrop['handlers']['onDragOver'] = (event) => {
    event.preventDefault();
  };

  const onDrop: DragAndDrop['handlers']['onDrop'] = (event) => {
    event.preventDefault();
    setIsDragOver(false);

    const files: Array<File> = [];

    if (event.dataTransfer.items) {
      Array.from(event.dataTransfer.items).forEach((item) => {
        if (item.kind === `file`) {
          const file = item.getAsFile();
          if (file) {
            files.push(file);
          }
        }
      });
    } else {
      Array.from(event.dataTransfer.files).forEach((file) => {
        files.push(file);
      });
    }

    onDropFiles(files);
  };

  return {
    isDragOver,
    handlers: {
      onDrop,
      onDragOver,
      onDragEnter,
      onDragLeave,
    },
  };
};
