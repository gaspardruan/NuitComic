import { useHeaderHeight } from "@react-navigation/elements";
import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
  StyleSheet,
} from "react-native";

import { tintColorLight } from "@/common/theme";
import AutoSizedImage from "@/components/comic/AutoSizedImage";
import ComicDesc from "@/components/comic/ComicDesc";
import ContentRow from "@/components/comic/ContentRow";
import RatingRow from "@/components/comic/RatingRow";
import TagRow from "@/components/comic/TagRow";
import ViewNum from "@/components/comic/ViewNum";
import GuessLike from "@/components/GuessLike";
import { IconSymbol } from "@/components/icon/IconSymbol";
import ThemedText from "@/components/ThemedText";
import { useScrollOffset } from "@/hooks/useScrollOffset";

const topGap = 4;
const sectionGap = 20;
const titleHeight = 24;

export default function ComicDetail() {
  const {
    id,
    title,
    cover,
    image,
    score,
    view,
    keyword,
    desc,
    author,
    updateTime,
    isOver,
  } = useLocalSearchParams<{
    id: string;
    title: string;
    cover: string;
    image: string;
    score: string;
    view: string;
    keyword: string;
    desc: string;
    author: string;
    updateTime: string;
    isOver: string;
  }>();
  const headerHeight = useHeaderHeight();

  const [textY, setTextY] = useState(0);
  const [showHeader, onScrollForHeader] = useScrollOffset(topGap);
  const [showTitle, onScrollForTitle] = useScrollOffset(textY - headerHeight);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    onScrollForHeader(e);
    onScrollForTitle(e);
  };

  const onLayout = (e: LayoutChangeEvent) => {
    // I've checked by demo that:
    // y is relative to the parent and not including padding.
    // That's to say, y of the first child in the parent is always 0.
    const { y } = e.nativeEvent.layout;
    setTextY(headerHeight + topGap + y + sectionGap + titleHeight);
  };

  const onContentClick = useCallback(() => {
    console.log("onContentClick");
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: showTitle ? title : "",
          headerShown: true,
          headerTransparent: true,
          headerBackButtonDisplayMode: "minimal",
          headerBlurEffect: showHeader ? "systemChromeMaterial" : "none",
          headerShadowVisible: showHeader,
          headerRight: () => (
            <IconSymbol
              name="arrow.down.circle.fill"
              color={tintColorLight}
              size={32}
              type="hierarchical"
              weight="light"
            />
          ),
        }}
      />
      <ScrollView
        style={{
          paddingTop: headerHeight + topGap,
          paddingHorizontal: 20,
        }}
        onScroll={onScroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Cover */}
        <View style={{ alignItems: "center" }}>
          <AutoSizedImage uri={cover} fallbackUri={image} />
        </View>

        {/* Details */}
        <View
          onLayout={onLayout}
          style={{ paddingVertical: sectionGap, gap: 16 }}
        >
          <View style={{ gap: 8 }}>
            <ThemedText type="mediumTitle">{title}</ThemedText>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <RatingRow score={score} />
              <ViewNum view={view} />
            </View>
            <TagRow author={author} tags={keyword} />
          </View>

          <ComicDesc desc={desc} />

          <ContentRow
            id={id}
            updateTime={updateTime}
            isOver={isOver}
            onClick={onContentClick}
          />
        </View>

        {/* More */}
        <GuessLike style={styles.guessLike} useSecondaryBackground />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  guessLike: {
    paddingTop: sectionGap,
    paddingBottom: 100,
    paddingHorizontal: 20,
    marginHorizontal: -20,
  },
});
