import { getUpdatedComicByPage } from "@/axios/comic";

import { ComicList } from "@/components/home/ComicList";
import { useComicByPage } from "@/hooks/useComicByPage";

export default function UpdateScreen() {
  const [comics, loadNextPage] = useComicByPage(getUpdatedComicByPage);

  return <ComicList title="更新" comics={comics} loadNextPage={loadNextPage} />;
}
