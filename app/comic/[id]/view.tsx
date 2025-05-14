import { getComicAllChapter } from "@/axios/comic";
import { getAbsoluteImageURLs } from "@/common/util";
import { ComicReader } from "@/components/comic/view/ComicReader";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

export default function ComicView() {
  const { id, index } = useLocalSearchParams<{ id: string; index: string }>();

  const { data } = useQuery({
    queryKey: ["comic", id],
    queryFn: async () => getComicAllChapter(id),
  });
  const chapters = data ?? [];
  const imageURLs = getAbsoluteImageURLs(chapters[Number(index)].imageList);

  return <ComicReader id={id} index={index} imageURLs={imageURLs} />;
}
