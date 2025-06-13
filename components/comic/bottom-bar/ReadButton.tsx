import { HorizontalGap } from "@/common/constant";
import { tintColorLight } from "@/common/theme";
import ThemedText from "@/components/ThemedText";
import { useReadStore } from "@/state/read";
import { useRouter } from "expo-router";
import { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type ReadButtonProps = {
  id: number;
};

const ReadButton = ({ id }: ReadButtonProps) => {
  const lastRead = useReadStore((state) => state.lastRead);
  const lastReadIndex = lastRead.get(id);
  const text = lastReadIndex === undefined ? "开始阅读" : `续看${lastReadIndex + 1}话`;
  const index = lastReadIndex === undefined ? 0 : lastReadIndex;

  const router = useRouter();
  const handlePress = () => {
    router.navigate(
      {
        pathname: "./view",
        params: {
          index,
        },
      },
      { relativeToDirectory: true }
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.bottomButton, { marginLeft: HorizontalGap / 2 }]}
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
    backgroundColor: tintColorLight,
    height: "100%",
    borderRadius: 8,
  },
});

export default memo(ReadButton);
