import { getMostFollowComicByPage } from "@/axios/comic";

import { ComicListScreen } from "@/components/home/ComicListScreen";
import { useComicByPage } from "@/hooks/useComicByPage";

export default function MostFollowScreen() {
  const [comics, loadNextPage] = useComicByPage(getMostFollowComicByPage);

  return <ComicListScreen title="最多收藏" comics={comics} loadNextPage={loadNextPage} />;
}
