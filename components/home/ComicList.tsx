import { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Comic } from "@/common/interface";
import { tintColorLight } from "@/common/color";

import { ComicRow } from "./ComicRow";

type ComicListProps = {
  title: string;
  comics: Comic[];
  loadNextPage: () => void;
};

export function ComicList({ title, comics, loadNextPage }: ComicListProps) {
  const backgroundColor = useThemeColor("background");
  const text = useThemeColor("text");

  const [blur, setBlur] = useState(false);
  const headerHeight = useHeaderHeight();

  const showHeaderThreshold = 4;

  const renderRow = ({ item }: { item: Comic }) => {
    return <ComicRow comic={item} />;
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: title,
          headerBackButtonDisplayMode: "minimal",
          headerStyle: {
            backgroundColor: blur ? "transparent" : backgroundColor,
          },
          headerTransparent: true,
          headerBlurEffect: "systemChromeMaterial",
          headerTintColor: tintColorLight,
          headerTitleStyle: { color: text },
          headerShadowVisible: blur,
        }}
      />
      <FlatList
        style={[
          styles.container,
          {
            paddingTop: headerHeight,
            backgroundColor: backgroundColor,
          },
        ]}
        contentContainerStyle={{ gap: 16 }}
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y < showHeaderThreshold && blur) {
            setBlur(false);
          } else if (
            e.nativeEvent.contentOffset.y >= showHeaderThreshold &&
            !blur
          ) {
            setBlur(true);
          }
        }}
        data={comics}
        renderItem={renderRow}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.5}
        onEndReached={loadNextPage}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
