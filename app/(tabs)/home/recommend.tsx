import { getRecommendComicByPage } from "@/axios/comic";

import { ComicListScreen } from "@/components/home/ComicListScreen";
import { useComicByPage } from "@/hooks/useComicByPage";

export default function MostViewScreen() {
  const [comics, loadNextPage] = useComicByPage(getRecommendComicByPage);

  return <ComicListScreen title="推荐" comics={comics} loadNextPage={loadNextPage} />;
}
