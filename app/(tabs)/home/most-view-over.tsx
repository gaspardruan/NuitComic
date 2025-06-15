import { getMostViewOverComicByPage } from "@/axios/comic";

import { ComicListScreen } from "@/components/home/ComicListScreen";
import { useComicByPage } from "@/hooks/useComicByPage";

export default function MostViewOverScreen() {
  const [comics, loadNextPage] = useComicByPage(getMostViewOverComicByPage);

  return <ComicListScreen title="最多阅读（完结）" comics={comics} loadNextPage={loadNextPage} />;
}
