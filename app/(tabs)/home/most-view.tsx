import { getMostViewComicByPage } from "@/axios/comic";

import { ComicListScreen } from "@/components/home/ComicListScreen";
import { useComicByPage } from "@/hooks/useComicByPage";

export default function MostViewScreen() {
  const [comics, loadNextPage] = useComicByPage(getMostViewComicByPage);

  return <ComicListScreen title="最多阅读" comics={comics} loadNextPage={loadNextPage} />;
}
