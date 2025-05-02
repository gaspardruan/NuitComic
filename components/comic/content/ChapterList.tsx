import { ComicChapter } from "@/common/interface";
import { FlatList, StyleSheet, View } from "react-native";
import ThemedText from "@/components/ThemedText";
import { tintColorLight } from "@/common/theme";
import { ChapterRow } from "./ChapterRow";
import { useState } from "react";

type ChapterListProps = {
  chapters: ComicChapter[];
  onClose: () => void;
};

type RenderRowProps = {
  item: ComicChapter;
  index: number;
};

export const ChapterList = ({ chapters, onClose }: ChapterListProps) => {
  const [reverse, setReverse] = useState(false);
  const adjustChapters = reverse ? [...chapters].reverse() : chapters;

  const renderRow = ({ item, index }: RenderRowProps) => {
    return <ChapterRow item={item} index={index} onPress={onClose} />;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.chapterHeader}>
        <ThemedText type="medium">全部章节（{chapters.length}）</ThemedText>
        <View style={styles.chapterHeaderRight}>
          <ThemedText
            type="small"
            style={!reverse ? { color: tintColorLight } : undefined}
            onPress={() => reverse && setReverse(false)}
            suppressHighlighting
          >
            正序
          </ThemedText>

          <ThemedText type="small">｜</ThemedText>

          <ThemedText
            type="small"
            style={reverse ? { color: tintColorLight } : undefined}
            onPress={() => !reverse && setReverse(true)}
            suppressHighlighting
          >
            倒序
          </ThemedText>
        </View>
      </View>

      <FlatList
        style={{ paddingHorizontal: 16 }}
        contentContainerStyle={{
          gap: 16,
          paddingBottom: 80,
        }}
        data={adjustChapters}
        keyExtractor={(item) => item.id}
        renderItem={renderRow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chapterHeader: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chapterHeaderRight: {
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    gap: 4,
  },
});
