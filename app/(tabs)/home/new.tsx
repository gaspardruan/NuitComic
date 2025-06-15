import { getNewComicByPage } from "@/axios/comic";

import { ComicListScreen } from "@/components/home/ComicListScreen";
import { useComicByPage } from "@/hooks/useComicByPage";

export default function NewScreen() {
  const [comics, loadNextPage] = useComicByPage(getNewComicByPage);

  return <ComicListScreen title="新作" comics={comics} loadNextPage={loadNextPage} />;
}
