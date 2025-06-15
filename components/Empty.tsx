import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, View } from "react-native";
import ThemedText from "./ThemedText";
import { IconSymbol, IconSymbolName } from "./icon/IconSymbol";

type EmptyProps = {
  icon: IconSymbolName;
  msg: string;
};

export function Empty({ icon, msg }: EmptyProps) {
  const backgroundColor = useThemeColor("background");

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <IconSymbol name={icon} size={48} />
      <ThemedText type="info">{msg}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    marginTop: "50%",
    alignItems: "center",
  },
});
