import { useThemeColor } from "@/hooks/useThemeColor";
import { ActivityIndicator, View } from "react-native";

export function Loading() {
  const textColor = useThemeColor("text");
  const backgroundColor = useThemeColor("background");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor,
      }}
    >
      <ActivityIndicator size="large" color={textColor} />
    </View>
  );
}
