import { useEffect, useState } from 'react';

type DragToReorder = {
  calculateReorderedIndex: (itemIndex: number) => number;
  draggedPostId: string | null;
  dragOverIndex: number | null;
  isDragging: (plannedPostId: string) => boolean;
  isMoveAnimationActive: boolean;
  onDragEnd: () => void;
  onDragEnter: (reorderedIndex: number) => () => void;
  onDragStart: (plannedPostId: string) => () => void;
};

export default (): DragToReorder => {
  const [draggedPostId, setDraggedPostId] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isMoveAnimationActive, setIsMoveAnimationActive] = useState(false);

  useEffect(() => {
    setIsMoveAnimationActive(true);
    const timeout = setTimeout(() => {
      setIsMoveAnimationActive(false);
    }, 200);
    return (): void => {
      clearTimeout(timeout);
    };
  }, [dragOverIndex]);

  const calculateReorderedIndex = (itemIndex: number): number => {
    if (dragOverIndex === null) {
      return itemIndex;
    }

    if (dragOverIndex >= itemIndex) {
      return itemIndex - 1;
    }

    return itemIndex;
  };

  const isDragging: DragToReorder['isDragging'] = (plannedPostId) => {
    return draggedPostId === plannedPostId;
  };

  const onDragEnd: DragToReorder['onDragEnd'] = () => {
    setDraggedPostId(null);
    setDragOverIndex(null);
  };

  const onDragEnter: DragToReorder['onDragEnter'] = (reorderedIndex) => {
    return () => {
      setDragOverIndex(reorderedIndex);
    };
  };

  const onDragStart: DragToReorder['onDragStart'] = (plannedPostId) => {
    return () => {
      setDraggedPostId(plannedPostId);
    };
  };

  return {
    calculateReorderedIndex,
    draggedPostId,
    dragOverIndex,
    isDragging,
    isMoveAnimationActive,
    onDragEnd,
    onDragEnter,
    onDragStart,
  };
};
