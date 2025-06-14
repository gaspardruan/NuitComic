import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAllComic } from "@/axios/comic";
import { HorizontalGap, MaxRencentlyRead, ReduntantBottomHeight, YOffset } from "@/common/constant";
import { Comic } from "@/common/interface";
import { tintColorLight } from "@/common/theme";
import { Loading } from "@/components/Loading";
import { SimpleGrid } from "@/components/shelf/SimpleGrid";
import ThemedText from "@/components/ThemedText";
import { Error } from "@/components/Error";
import { useReadStore } from "@/state/read";
import { useUIStore } from "@/state/ui";
import { ComicReadCover } from "@/components/shelf/ComicReadCover";

const Gap = 8;
const { width } = Dimensions.get("window");

const getComicMap = async () => {
  const comics = await getAllComic();
  const comicMap = new Map<number, Comic>();
  comics.forEach((comic) => {
    comicMap.set(Number(comic.id), comic);
  });
  return comicMap;
};

export default function ShelfScreen() {
  const headerHeight = useUIStore((state) => state.headerHeight);
  const top = headerHeight - YOffset;

  const gridWidth = width - HorizontalGap * 2;

  const [activeTab, setActiveTab] = useState<number>(0);

  const collections = Array.from(useReadStore((state) => state.collections));
  const lastRead = useReadStore((state) => state.lastRead);
  const recentRead = Array.from(lastRead.keys()).slice(-MaxRencentlyRead);

  // why do I get all comics here?
  // because I don't find the api to get comic by id.
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allComics"],
    queryFn: getComicMap,
  });
  const comicMap = data ?? new Map();
  const collectionComics = comicMap.size === 0 ? [] : collections.map((id) => comicMap.get(id));
  const recentlyReadComics = comicMap.size === 0 ? [] : recentRead.map((id) => comicMap.get(id));

  const showData = activeTab === 0 ? collectionComics : recentlyReadComics;

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error error={error?.message} />;
  }

  console.log("Shelf render");

  return (
    <View style={[styles.container, { marginTop: top }]}>
      <ThemedText type="title" style={styles.title}>
        书架
      </ThemedText>
      <View style={styles.tab}>
        <TouchableOpacity onPress={() => setActiveTab(0)} activeOpacity={1} hitSlop={Gap}>
          <ThemedText type="medium" style={activeTab === 0 ? { color: tintColorLight } : {}}>
            最近收藏
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab(1)} activeOpacity={1} hitSlop={Gap}>
          <ThemedText type="medium" style={activeTab === 1 ? { color: tintColorLight } : {}}>
            最近在看
          </ThemedText>
        </TouchableOpacity>
      </View>

      <SimpleGrid
        key={activeTab}
        data={showData}
        totalWidth={gridWidth}
        verticalGap={HorizontalGap}
        horizontalGap={HorizontalGap}
        contentContainerStyle={styles.scrollContainer}
        renderItem={(comic, index) => (
          <ComicReadCover comic={comic} lastRead={lastRead.get(Number(comic.id)) ?? 0} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingHorizontal: HorizontalGap,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: HorizontalGap,
    paddingTop: HorizontalGap,
    paddingBottom: Gap,
    paddingHorizontal: HorizontalGap,
  },
  scrollContainer: {
    paddingHorizontal: HorizontalGap,
    paddingBottom: ReduntantBottomHeight,
    paddingTop: HorizontalGap - Gap,
  },
});
