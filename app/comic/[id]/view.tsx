import { getComicAllChapter } from "@/axios/comic";
import { tintColorLight } from "@/common/theme";
import { shortTitle } from "@/common/util";
import ComicReader from "@/components/comic/view/ComicReader";
import ThemedText from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useReadStore } from "@/state/read";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";

export default function ComicView() {
  const { id, index } = useLocalSearchParams<{ id: string; index: string }>();
  const idInt = Number(id);
  const chapterIndex = Number(index);

  const newRead = useReadStore((state) => state.newRead);

  const { data } = useQuery({
    queryKey: ["comic", idInt],
    queryFn: async () => getComicAllChapter(idInt),
  });
  const chapters = useMemo(() => data ?? [], [data]);

  const [title, setTitle] = useState<string>("");
  const [showHeader, setShowHeader] = useState<boolean>(false);
  const backgroundColor = useThemeColor("background");

  const handleUpdateChapter = useCallback(
    (newChapterIndex: number) => {
      setTitle(chapters[newChapterIndex].title);
      newRead(idInt, newChapterIndex);
    },
    [chapters, idInt, newRead]
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
          title: "",
          headerBackTitleStyle: { fontSize: 16 },
          headerTransparent: true,
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          headerBackVisible: true,
          headerLeft: () => (
            <View style={{ marginLeft: -17 }}>
              <ThemedText type="emphasis">{shortTitle(title)}</ThemedText>
            </View>
          ),
          headerRight: () => null,
          headerTintColor: tintColorLight,
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
