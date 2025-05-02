import { TouchableOpacity, View } from "react-native";
import ThemedText from "../ThemedText";
import { memo, useEffect, useState } from "react";
import { getComicChapterNum } from "@/axios/comic";
import { IconSymbol } from "../icon/IconSymbol";
import { formatTime } from "@/common/util";

type ContentRowProps = {
  id: string;
  updateTime: string;
  isOver: string;
  onClick: () => void;
};

const ContentRow = ({ id, updateTime, isOver, onClick }: ContentRowProps) => {
  const [chapterNum, setChapterNum] = useState(0);

  console.log("ContentRow rendered");

  useEffect(() => {
    getComicChapterNum(id).then((res) => {
      setChapterNum(res);
    });
  }, [id]);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{ justifyContent: "space-between", flexDirection: "row" }}
      onPress={onClick}
    >
      <ThemedText type="subtitle">目录</ThemedText>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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

export default memo(ContentRow);
