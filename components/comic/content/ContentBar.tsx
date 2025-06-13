import { StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedText from "../../ThemedText";
import { memo, useCallback, useState } from "react";
import { getComicAllChapter } from "@/axios/comic";
import { IconSymbol } from "../../icon/IconSymbol";
import { formatTime } from "@/common/util";
import { useQuery } from "@tanstack/react-query";
import { ContentModal } from "./ContentModal";

type ContentRowProps = {
  id: number;
  updateTime: string;
  isOver: string;
};

const ContentBar = ({ id, updateTime, isOver }: ContentRowProps) => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["comic", id],
    queryFn: async () => getComicAllChapter(id),
  });
  const chapters = data ?? [];
  const chapterNum = data?.length ?? 0;

  const onContentClick = useCallback(() => {
    setIsContentVisible(true);
  }, []);

  const onContentClose = useCallback(() => {
    setIsContentVisible(false);
  }, []);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.container, { opacity: isLoading ? 0 : 1 }]}
        onPress={onContentClick}
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
      <ContentModal
        isVisible={isContentVisible}
        onClose={onContentClose}
        chapters={chapters}
      />
    </>
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

export default memo(ContentBar);
