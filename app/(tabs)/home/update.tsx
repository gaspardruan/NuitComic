import { getUpdatedComicByPage } from "@/axios/comic";

import { ComicListScreen } from "@/components/home/ComicListScreen";
import { useComicByPage } from "@/hooks/useComicByPage";

export default function UpdateScreen() {
  const [comics, loadNextPage] = useComicByPage(getUpdatedComicByPage);

  return <ComicListScreen title="更新" comics={comics} loadNextPage={loadNextPage} />;
}
