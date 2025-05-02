import { getIndexData } from "@/axios/comic";
import { IndexComicData } from "@/common/interface";
import GuessLike from "@/components/GuessLike";
import { Section } from "@/components/ComicSection";
import { Loading } from "@/components/Loading";
import ThemedText from "@/components/ThemedText";
import { useScrollOffset } from "@/hooks/useScrollOffset";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useHeaderHeight } from "@react-navigation/elements";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const yOffset = 24;
  const scrollThreshold = headerHeight - insets.top - yOffset;
  const [showHeader, onScroll] = useScrollOffset(scrollThreshold);

  const textColor = useThemeColor("text");

  const [comics, setComics] = useState<IndexComicData>({
    new: [],
    update: [],
    mostView: [],
    mostFollow: [],
    mostViewOver: [],
    recommend: [],
    mostSearch: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getIndexData().then((res) => {
      setComics(res);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: showHeader ? "主页" : "",
          headerTransparent: true,
          headerBlurEffect: showHeader ? "systemChromeMaterial" : "none",
          headerShadowVisible: showHeader,
          headerTintColor: textColor,
        }}
      />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          onScroll={onScroll}
          style={[styles.scrollContainer, { marginTop: headerHeight }]}
          contentContainerStyle={styles.contentContainer}
        >
          <ThemedText type="title" style={{ marginTop: -yOffset }}>
            主页
          </ThemedText>
          <Section
            title="新作"
            comics={comics.new}
            headerAction={() => router.navigate("./home/new")}
          />
          <Section
            title="更新"
            comics={comics.update}
            headerAction={() => router.push("./home/update")}
          />
          <Section
            title="最多阅读"
            comics={comics.mostView}
            headerAction={() => router.push("./home/most-view")}
          />
          <Section
            title="最多收藏"
            comics={comics.mostFollow}
            headerAction={() => router.push("./home/most-follow")}
          />
          <Section
            title="最多阅读（完结）"
            comics={comics.mostViewOver}
            headerAction={() => router.push("./home/most-view-over")}
          />
          <Section
            title="推荐"
            comics={comics.recommend}
            headerAction={() => router.push("./home/recommend")}
          />

          <Section title="最多搜索" comics={comics.mostSearch} />

          <GuessLike />
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    overflow: "visible",
  },
  contentContainer: {
    gap: 32,
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
});
