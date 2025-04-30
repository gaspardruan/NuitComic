import { getMostViewOverComicByPage } from "@/axios/comic";

import { ComicList } from "@/components/home/ComicList";
import { useComicByPage } from "@/hooks/useComicByPage";

export default function MostViewOverScreen() {
  const [comics, loadNextPage] = useComicByPage(getMostViewOverComicByPage);

  return (
    <ComicList
      title="最多阅读（完结）"
      comics={comics}
      loadNextPage={loadNextPage}
    />
  );
}
