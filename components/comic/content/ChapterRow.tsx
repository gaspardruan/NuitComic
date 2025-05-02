import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";

import { ComicChapter } from "@/common/interface";
import ThemedText from "@/components/ThemedText";

type ChapterRowProps = {
  item: ComicChapter;
  onPress: () => void;
  index: number;
};

export const ChapterRow = ({ item, onPress, index }: ChapterRowProps) => {
  return (
    <Link
      relativeToDirectory
      href={{
        pathname: "./view",
        params: {
          index,
        },
      }}
      onPress={onPress}
    >
      <View style={styles.chapterRow}>
        <View style={styles.chapterRowLeft}>
          <ThemedText type="bold" numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </ThemedText>
          <ThemedText type="tag">{item.createTime}</ThemedText>
        </View>
        <View style={styles.chapterRowRight}></View>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  chapterRow: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  chapterRowLeft: {
    flex: 1,
    gap: 2,
  },
  chapterRowRight: {
    width: 40,
  },
});
