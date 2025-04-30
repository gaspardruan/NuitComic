import { getMostViewComicByPage } from "@/axios/comic";

import { ComicList } from "@/components/home/ComicList";
import { useComicByPage } from "@/hooks/useComicByPage";

export default function MostViewScreen() {
  const [comics, loadNextPage] = useComicByPage(getMostViewComicByPage);

  return (
    <ComicList title="最多阅读" comics={comics} loadNextPage={loadNextPage} />
  );
}
