import { Comic } from "@/common/interface";
import { useEffect, useState } from "react";

type ComicRequest = (page?: number) => Promise<[Comic[], boolean]>;

export function useComicByPage(request: ComicRequest): [Comic[], () => void] {
  const [comics, setComics] = useState<Comic[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);

  useEffect(() => {
    request(1).then(([data, isLast]) => {
      setComics(data);
      setLastPage(isLast);
      setPage(2);
    });
  }, [request]);

  const loadNextPage = () => {
    if (lastPage) return;

    request(page).then(([data, isLast]) => {
      setComics((prev) => [...prev, ...data]); // 函数式更新
      setLastPage(isLast);
      setPage((prev) => prev + 1); // 函数式更新
    });
  };

  return [comics, loadNextPage];
}
