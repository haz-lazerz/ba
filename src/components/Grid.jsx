import { useSelector } from "react-redux";

import Card from "./Card";

export default function Grid({ loading, data }) {
  const { lockedItems } = useSelector((state) => state.main);
  if (!data) {
    const placeholder = Array(12).fill({});
    lockedItems.forEach(({ gridIndex, id, src }) =>
      placeholder.splice(gridIndex, 1, {
        id,
        gridIndex,
        images: {
          original: {
            url: src,
          },
        },
      })
    );
    return placeholder.map((gif, index) => (
      <Card
        src={gif?.images?.original?.url}
        key={gif?.id || index}
        gridIndex={index}
        id={gif?.id}
        locked={!!lockedItems?.find((it) => it?.id === gif.id)}
        loading={gif?.id ? false : loading}
      />
    ));
  }

  return data?.map((gif, index) => (
    <Card
      src={gif?.images?.original?.url}
      key={gif?.id}
      gridIndex={index}
      id={gif?.id}
      locked={!!lockedItems?.find((it) => it?.id === gif.id)}
      loading={loading}
    />
  ));
}
