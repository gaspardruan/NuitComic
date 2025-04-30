import { getNewComicByPage } from "@/axios/comic";

import { ComicList } from "@/components/home/ComicList";
import { useComicByPage } from "@/hooks/useComicByPage";

export default function NewScreen() {
  const [comics, loadNextPage] = useComicByPage(getNewComicByPage);

  return <ComicList title="新作" comics={comics} loadNextPage={loadNextPage} />;
}
