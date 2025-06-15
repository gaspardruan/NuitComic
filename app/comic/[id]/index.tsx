import { useHeaderHeight } from "@react-navigation/elements";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
  StyleSheet,
} from "react-native";

import { tintColorLight } from "@/common/theme";
import AutoSizedImage from "@/components/comic/detail/AutoSizeCover";
import ComicDesc from "@/components/comic/detail/ComicDesc";
import ContentBar from "@/components/comic/content/ContentBar";
import RatingRow from "@/components/comic/detail/RatingRow";
import TagRow from "@/components/comic/detail/TagRow";
import ViewNum from "@/components/comic/detail/ViewNum";
import GuessLike from "@/components/GuessLike";
import { IconSymbol } from "@/components/icon/IconSymbol";
import ThemedText from "@/components/ThemedText";
import { useScrollOffset } from "@/hooks/useScrollOffset";
import { BottomBar } from "@/components/comic/bottom-bar/BottomBar";
import ReadButton from "@/components/comic/bottom-bar/ReadButton";
import {
  ContentWidth,
  HorizontalGap,
  ReduntantBottomHeight,
  SectionGap,
  TitleHeight,
  TopGap,
} from "@/common/constant";
import CollectButton from "@/components/comic/bottom-bar/CollectButton";

export default function ComicDetail() {
  const { id, title, cover, image, score, view, keyword, desc, author, updateTime, isOver } =
    useLocalSearchParams<{
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
  const idInt = Number(id);

  // Heaer
  const headerHeight = useHeaderHeight();
  const [textY, setTextY] = useState(0);
  const [showHeader, onScrollForHeader] = useScrollOffset(TopGap);
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
    setTextY(headerHeight + TopGap + y + SectionGap + TitleHeight);
  };

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
          paddingTop: headerHeight + TopGap,
          paddingHorizontal: HorizontalGap,
        }}
        onScroll={onScroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Cover */}
        <View style={styles.cover}>
          <AutoSizedImage uri={cover} fallbackUri={image} />
        </View>

        {/* Details */}
        <View onLayout={onLayout} style={styles.details}>
          <View style={styles.detailsHeader}>
            <ThemedText type="mediumTitle">{title}</ThemedText>
            <View style={styles.honorRow}>
              <RatingRow score={score} />
              <ViewNum view={view} />
            </View>
            <TagRow author={author} tags={keyword} />
          </View>

          <ComicDesc desc={desc} />

          <ContentBar id={idInt} updateTime={updateTime} isOver={isOver} />
        </View>

        {/* More */}
        <GuessLike totalWidth={ContentWidth} style={styles.guessLike} useSecondaryBackground />
      </ScrollView>
      <BottomBar>
        <View style={styles.buttonGroup}>
          <CollectButton id={idInt} />
          <ReadButton id={idInt} />
        </View>
      </BottomBar>
    </>
  );
}

const styles = StyleSheet.create({
  cover: {
    alignItems: "center",
  },
  details: {
    paddingVertical: SectionGap,
    gap: 16,
  },
  detailsHeader: {
    gap: 8,
  },
  honorRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  guessLike: {
    paddingTop: SectionGap,
    paddingBottom: ReduntantBottomHeight,
    paddingHorizontal: HorizontalGap,
    marginHorizontal: -HorizontalGap,
  },
  buttonGroup: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    marginHorizontal: HorizontalGap,
  },
  bottomButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tintColorLight,
    height: "100%",
    borderRadius: 8,
  },
});
