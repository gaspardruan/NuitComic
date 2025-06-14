import { HorizontalGap } from "@/common/constant";
import { tintColorLight } from "@/common/theme";
import ThemedText from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useReadStore } from "@/state/read";
import { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type CollectButtonProps = {
  id: number;
};

const ReadButton = ({ id }: CollectButtonProps) => {
  const collections = useReadStore((state) => state.collections);
  const collect = useReadStore((state) => state.collect);
  const cancelCollect = useReadStore((state) => state.cancelCollect);
  const text = collections.has(id) ? "已收藏" : "收藏";

  const iconColor = useThemeColor("icon");

  const handlePress = () => {
    if (collections.has(id)) {
      cancelCollect(id);
    } else {
      collect(id);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[
        styles.bottomButton,
        {
          marginLeft: HorizontalGap / 2,
          backgroundColor: collections.has(id) ? iconColor : tintColorLight,
        },
      ]}
      onPress={handlePress}
    >
      <ThemedText type="defaultLight">{text}</ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bottomButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    borderRadius: 8,
  },
});

export default memo(ReadButton);
