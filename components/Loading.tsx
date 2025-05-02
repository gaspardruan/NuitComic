import { useThemeColor } from "@/hooks/useThemeColor";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export function Loading() {
  const textColor = useThemeColor("text");
  const backgroundColor = useThemeColor("background");

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ActivityIndicator size="large" color={textColor} />
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
