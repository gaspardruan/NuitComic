import { getRecommendComicByPage } from "@/axios/comic";

import { ComicList } from "@/components/home/ComicList";
import { useComicByPage } from "@/hooks/useComicByPage";

export default function MostViewScreen() {
  const [comics, loadNextPage] = useComicByPage(getRecommendComicByPage);

  return <ComicList title="推荐" comics={comics} loadNextPage={loadNextPage} />;
}
