export const reformatData = ({ data }) => {
  if (!data || !data.length) {
    return;
  }
  const lockedItems = localStorage.getItem("gridState");

  if (!lockedItems) {
    return data;
  }

  const lockedItemsParsed = JSON.parse(lockedItems);
  // const copy = [...data];
  lockedItemsParsed.forEach(({ gridIndex, id, src }) => {
    data.splice(gridIndex, 1, {
      id,
      gridIndex,
      images: {
        original: {
          url: src,
        },
      },
    });
  });

  return data;
};
