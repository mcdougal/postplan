export default (
  caption: string | null,
  updates: Array<{ hashtag: string; selected: boolean }>
): string => {
  let newCaption = caption || ``;

  const sortedUpdates = [...updates].sort((a, b) => {
    return b.hashtag.length - a.hashtag.length;
  });

  sortedUpdates.forEach(({ hashtag, selected }) => {
    if (selected) {
      newCaption = newCaption.replace(/[ ]+$/, ``);
      newCaption =
        !newCaption || newCaption.endsWith(`\n`)
          ? `${newCaption}${hashtag}`
          : `${newCaption} ${hashtag}`;
    } else {
      newCaption = newCaption.replace(new RegExp(`${hashtag}`, `g`), ``);
    }
  });

  return newCaption;
};
