import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSync } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import Button from "./components/Button";
import { initializeLockedItems } from "./slices";
import { reformatData } from "./helpers";
import Grid from "./components/Grid";
import Error from "./components/Error";

function App() {
  const { lockedItems } = useSelector((state) => state.main);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["randomGifs", offset],
    queryFn: () =>
      fetch(
        `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=12&offset=${offset}&rating=g&bundle=messaging_non_clips`
      ).then((res) => res.json()),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    dispatch(initializeLockedItems());
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (
        e.code === "Space" &&
        lockedItems.length !== 12
        // data?.meta?.status === 200
      ) {
        e.preventDefault();
        setOffset((current) => current + 12);
        refetch();
      }
    },
    [refetch, lockedItems, data]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isPending && data?.meta?.status !== 200) {
    return <Error message={data?.meta?.msg} />;
  }

  return (
    <div>
      <h1 className="text-5xl text-white text-center p-3">Giphy</h1>
      <header className="p-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-5 gap-3 place-items-center">
        <Grid loading={isPending} data={reformatData({ data: data?.data })} />
      </header>
      <div className="flex justify-center">
        <Button
          icon={<FaSync />}
          title="Hit here to refresh gifs or press space"
          onClick={() => {
            setOffset((current) => current + 12);
            refetch();
          }}
          disabled={isPending || error || lockedItems.length === 12}
        />
      </div>
    </div>
  );
}

export default App;
