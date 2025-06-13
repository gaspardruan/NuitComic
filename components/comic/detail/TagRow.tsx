import { ScrollView, StyleSheet } from "react-native";
import ThemedText from "@/components/ThemedText";
import { formatKeyword } from "@/common/util";
import { useThemeColor } from "@/hooks/useThemeColor";
import { memo } from "react";

type TagRowProps = {
  author: string;
  tags: string;
};

const TagRow = ({ author, tags }: TagRowProps) => {
  const tagBackground = useThemeColor("tagBackground");

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <ThemedText type="tag">作者：{author}</ThemedText>
      <ThemedText type="tag">|</ThemedText>
      {formatKeyword(tags).map((item, index) => (
        <ThemedText
          key={index}
          type="tag"
          style={[styles.tag, { backgroundColor: tagBackground }]}
        >
          {item}
        </ThemedText>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    alignItems: "center",
  },
  tag: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
});

export default memo(TagRow);
