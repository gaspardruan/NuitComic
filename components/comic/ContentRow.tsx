import { StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedText from "../ThemedText";
import { memo } from "react";
import { getComicAllChapter } from "@/axios/comic";
import { IconSymbol } from "../icon/IconSymbol";
import { formatTime } from "@/common/util";
import { useQuery } from "@tanstack/react-query";

type ContentRowProps = {
  id: string;
  updateTime: string;
  isOver: string;
  onClick: () => void;
};

const ContentRow = ({ id, updateTime, isOver, onClick }: ContentRowProps) => {
  const { isLoading, data } = useQuery({
    queryKey: ["comic", id],
    queryFn: async () => getComicAllChapter(id),
  });
  const chapterNum = data?.length ?? 0;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.container, { opacity: isLoading ? 0 : 1 }]}
      onPress={onClick}
    >
      <ThemedText type="subtitle">目录</ThemedText>
      <View style={styles.row}>
        <ThemedText type="default">
          {isOver === "0"
            ? `连载至${chapterNum}章·${formatTime(updateTime)}`
            : `${chapterNum}章·完本`}
        </ThemedText>
        <IconSymbol name="chevron.right" size={16} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default memo(ContentRow);
