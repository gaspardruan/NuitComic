import { Colors } from "@/common/color";
import { useColorScheme } from "react-native";

export function useThemeColor(
  role: keyof typeof Colors.light,
  props?: { light?: string; dark?: string }
) {
  const theme = useColorScheme() || "light";
  const colorFromProps = props?.[theme];

  return colorFromProps || Colors[theme][role];
}
