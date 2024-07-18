export default (
  caption: string | null,
  updates: Array<{ hashtag: string; selected: boolean }>
): string => {
  let newCaption = caption || ``;

  updates.forEach(({ hashtag, selected }) => {
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

  console.log(`==== BEFORE`);
  console.log(caption);
  console.log(`==== AFTER`);
  console.log(newCaption);

  return newCaption;
};
