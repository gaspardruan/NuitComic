import { ScrollView } from "react-native";
import ThemedText from "../ThemedText";
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
      contentContainerStyle={{ gap: 8, alignItems: "center" }}
    >
      <ThemedText type="tag">作者：{author}</ThemedText>
      <ThemedText type="tag">|</ThemedText>
      {formatKeyword(tags).map((item, index) => (
        <ThemedText
          key={index}
          type="tag"
          style={{
            backgroundColor: tagBackground,
            paddingVertical: 2,
            paddingHorizontal: 10,
            borderRadius: 12,
          }}
        >
          {item}
        </ThemedText>
      ))}
    </ScrollView>
  );
};

export default memo(TagRow);
