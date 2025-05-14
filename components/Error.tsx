import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, View } from "react-native";
import ThemedText from "./ThemedText";

type ErrorProps = {
  error?: string;
};

export function Error({ error }: ErrorProps) {
  const backgroundColor = useThemeColor("background");

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ThemedText type="title">图片加载失败</ThemedText>
      <ThemedText type="subtitle">{error}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
