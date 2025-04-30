import { getMostFollowComicByPage } from "@/axios/comic";

import { ComicList } from "@/components/home/ComicList";
import { useComicByPage } from "@/hooks/useComicByPage";

export default function MostFollowScreen() {
  const [comics, loadNextPage] = useComicByPage(getMostFollowComicByPage);

  return (
    <ComicList title="最多收藏" comics={comics} loadNextPage={loadNextPage} />
  );
}
