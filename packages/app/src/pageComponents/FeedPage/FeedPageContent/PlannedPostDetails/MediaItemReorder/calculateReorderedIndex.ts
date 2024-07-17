export default (
  itemIndex: number,
  draggingIndex: number | null,
  dragOverIndex: number | null
): number => {
  if (
    draggingIndex === null ||
    dragOverIndex === null ||
    dragOverIndex === draggingIndex
  ) {
    return itemIndex;
  }

  if (itemIndex === draggingIndex) {
    return dragOverIndex;
  }

  if (dragOverIndex <= itemIndex && itemIndex <= draggingIndex) {
    return itemIndex + 1;
  }

  if (draggingIndex <= itemIndex && itemIndex <= dragOverIndex) {
    return itemIndex - 1;
  }

  return itemIndex;
};
