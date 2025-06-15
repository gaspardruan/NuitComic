import { getIndexData } from "@/axios/comic";
import GuessLike from "@/components/GuessLike";
import { Section } from "@/components/ComicSection";
import { Loading } from "@/components/Loading";
import ThemedText from "@/components/ThemedText";
import { useScrollOffset } from "@/hooks/useScrollOffset";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useHeaderHeight } from "@react-navigation/elements";
import { router, Stack } from "expo-router";
import { StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { ContentWidth, HorizontalGap, ReduntantBottomHeight, YOffset } from "@/common/constant";
import { useUIStore } from "@/state/ui";

export default function HomeScreen() {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const scrollThreshold = headerHeight - insets.top - YOffset;
  const [showHeader, onScroll] = useScrollOffset(scrollThreshold);

  const textColor = useThemeColor("text");

  const setHeaderHeight = useUIStore((state) => state.setHeaderHeight);
  setHeaderHeight(headerHeight);

  const { data: comics } = useQuery({
    queryKey: ["home"],
    queryFn: getIndexData,
  });

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
      {!comics ? (
        <Loading />
      ) : (
        <ScrollView
          onScroll={onScroll}
          style={[styles.scrollContainer, { marginTop: headerHeight }]}
          contentContainerStyle={styles.contentContainer}
        >
          <ThemedText type="title" style={styles.title}>
            主页
          </ThemedText>
          <Section
            title="新作"
            comics={comics.new}
            totalWidth={ContentWidth}
            headerAction={() => router.navigate("./home/new")}
          />
          <Section
            title="更新"
            comics={comics.update}
            totalWidth={ContentWidth}
            headerAction={() => router.push("./home/update")}
          />
          <Section
            title="最多阅读"
            comics={comics.mostView}
            totalWidth={ContentWidth}
            headerAction={() => router.push("./home/most-view")}
          />
          <Section
            title="最多收藏"
            comics={comics.mostFollow}
            totalWidth={ContentWidth}
            headerAction={() => router.push("./home/most-follow")}
          />
          <Section
            title="最多阅读（完结）"
            comics={comics.mostViewOver}
            totalWidth={ContentWidth}
            headerAction={() => router.push("./home/most-view-over")}
          />
          <Section
            title="推荐"
            comics={comics.recommend}
            totalWidth={ContentWidth}
            headerAction={() => router.push("./home/recommend")}
          />

          <Section title="最多搜索" comics={comics.mostSearch} totalWidth={ContentWidth} />

          <GuessLike totalWidth={ContentWidth} />
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
    paddingBottom: ReduntantBottomHeight,
    paddingHorizontal: HorizontalGap,
  },
  title: {
    marginTop: -YOffset,
  },
});
