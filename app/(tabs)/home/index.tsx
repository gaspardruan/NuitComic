import { getGuessLikeComic, getIndexData } from "@/axios/comic";
import { Comic, IndexComicData } from "@/common/interface";
import { Section } from "@/components/home/HomeSection";
import { Loading } from "@/components/Loading";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useHeaderHeight } from "@react-navigation/elements";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [showHeader, setShowHeader] = useState(false);
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const yOffset = 24;
  const scrollThreshold = headerHeight - insets.top - yOffset;

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y < scrollThreshold && showHeader) {
      setShowHeader(false);
    } else if (
      e.nativeEvent.contentOffset.y >= scrollThreshold &&
      !showHeader
    ) {
      setShowHeader(true);
    }
  };

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
  const [guess, setGuess] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);

  const guessLike = () => {
    getGuessLikeComic().then((res) => {
      setGuess(res);
    });
  };

  useEffect(() => {
    Promise.all([getIndexData(), getGuessLikeComic()]).then(([res1, res2]) => {
      setComics(res1);
      setGuess(res2);
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
          <ThemedText
            type="title"
            style={{ marginTop: -yOffset, marginBottom: 12 }}
          >
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
          <Section title="推荐" comics={comics.recommend} />

          <Section title="最多搜索" comics={comics.mostSearch} />

          <Section
            title="猜你喜欢"
            comics={guess}
            icon="arrow.trianglehead.2.clockwise"
            headerAction={guessLike}
          />
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
    gap: 20,
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
});
