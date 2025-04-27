import { useThemeColor } from "@/hooks/useThemeColor";
import {
  SymbolType,
  SymbolView,
  SymbolViewProps,
  SymbolWeight,
} from "expo-symbols";
import { StyleProp, ViewStyle } from "react-native";

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = "regular",
  type,
}: {
  name: SymbolViewProps["name"];
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
  type?: SymbolType;
}) {
  const c = color ?? useThemeColor("icon");
  return (
    <SymbolView
      weight={weight}
      tintColor={c}
      type={type}
      resizeMode="scaleAspectFit"
      name={name}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}
