import { getComicAllChapter } from "@/axios/comic";
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

  return <ComicReader id={id} index={Number(index)} chapters={chapters} />;
}
