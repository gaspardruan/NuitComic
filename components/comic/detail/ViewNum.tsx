import { StyleSheet, View } from "react-native";
import ThemedText from "@/components/ThemedText";
import { formatNumber } from "@/common/util";
import { memo } from "react";

type ViewNumProps = {
  view: number | string;
};

const ViewNum = ({ view }: ViewNumProps) => {
  return (
    <View style={styles.container}>
      <ThemedText type="tag">阅读指数</ThemedText>
      <ThemedText type="tag">{formatNumber(view)}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});

export default memo(ViewNum);
