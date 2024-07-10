import { useEffect, useState } from 'react';

type DragToReorder = {
  calculateReorderedIndex: (itemIndex: number) => number;
  isDragging: (plannedPostIndex: number) => boolean;
  isMoveAnimationActive: () => boolean;
  onDragEnd: () => void;
  onDragEnter: (reorderedIndex: number) => () => void;
  onDragStart: (plannedPostIndex: number) => () => void;
};

export default (): DragToReorder => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [moveAnimationActive, setMoveAnimationActive] = useState(false);

  useEffect(() => {
    setMoveAnimationActive(true);
    const timeout = setTimeout(() => {
      setMoveAnimationActive(false);
    }, 200);
    return (): void => {
      clearTimeout(timeout);
    };
  }, [dragOverIndex]);

  const calculateReorderedIndex = (itemIndex: number): number => {
    if (
      draggingIndex === null ||
      dragOverIndex === null ||
      dragOverIndex === draggingIndex
    ) {
      return itemIndex;
    }

    if (dragOverIndex <= itemIndex && itemIndex <= draggingIndex) {
      return itemIndex + 1;
    }

    if (draggingIndex <= itemIndex && itemIndex <= dragOverIndex) {
      return itemIndex - 1;
    }

    return itemIndex;
  };

  const isDragging: DragToReorder['isDragging'] = (plannedPostIndex) => {
    return draggingIndex === plannedPostIndex;
  };

  const isMoveAnimationActive: DragToReorder['isMoveAnimationActive'] = () => {
    return moveAnimationActive;
  };

  const onDragEnd: DragToReorder['onDragEnd'] = () => {
    setDraggingIndex(null);
    setDragOverIndex(null);
  };

  const onDragEnter: DragToReorder['onDragEnter'] = (reorderedIndex) => {
    return () => {
      setDragOverIndex(reorderedIndex);
    };
  };

  const onDragStart: DragToReorder['onDragStart'] = (plannedPostIndex) => {
    return () => {
      setDraggingIndex(plannedPostIndex);
    };
  };

  return {
    calculateReorderedIndex,
    isDragging,
    isMoveAnimationActive,
    onDragEnd,
    onDragEnter,
    onDragStart,
  };
};
