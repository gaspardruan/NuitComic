import { View } from "react-native";
import ThemedText from "../ThemedText";
import { formatNumber } from "@/common/util";
import { memo } from "react";

type ViewNumProps = {
  view: number | string;
};

const ViewNum = ({ view }: ViewNumProps) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
      <ThemedText type="tag">阅读指数</ThemedText>
      <ThemedText type="tag">{formatNumber(view)}</ThemedText>
    </View>
  );
};

export default memo(ViewNum);
