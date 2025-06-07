import { getComicAllChapter } from "@/axios/comic";
import { shortTitle } from "@/common/util";
import ComicReader from "@/components/comic/view/ComicReader";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function ComicView() {
  const { id, index } = useLocalSearchParams<{ id: string; index: string }>();
  const chapterIndex = Number(index);

  const { data } = useQuery({
    queryKey: ["comic", id],
    queryFn: async () => getComicAllChapter(id),
  });
  const chapters = useMemo(() => data ?? [], [data]);

  const [title, setTitle] = useState<string>("");
  const [showHeader, setShowHeader] = useState<boolean>(false);
  const backgroundColor = useThemeColor("background");

  const handleUpdateChapter = useCallback(
    (chapterIndex: number) => {
      setTitle(chapters[chapterIndex].title);
    },
    [chapters]
  );

  const handleTap = useCallback(() => {
    setShowHeader((showHeader) => !showHeader);
  }, []);

  const handleScrollBeginDrag = useCallback(() => {
    setShowHeader(false);
  }, []);

  useEffect(() => {
    if (chapters.length > 0) {
      setTitle(chapters[chapterIndex].title);
    }
  }, [chapters, chapterIndex]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: showHeader,
          headerBackTitle: shortTitle(title),
          title: "",
          headerBackTitleStyle: { fontSize: 16 },
          headerTransparent: true,
          headerStyle: {
            backgroundColor: backgroundColor,
          },
        }}
      />
      <ComicReader
        id={id}
        index={chapterIndex}
        chapters={chapters}
        onUpdateChapter={handleUpdateChapter}
        onTap={handleTap}
        onScrollBeginDrag={handleScrollBeginDrag}
      />
    </>
  );
}
