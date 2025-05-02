import { useThemeColor } from "@/hooks/useThemeColor";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import ReadMore from "react-native-read-more-text";
import { IconSymbol } from "../icon/IconSymbol";
import ThemedText from "../ThemedText";
import { memo } from "react";

type ComicDescProps = {
  desc: string;
  style?: StyleProp<ViewStyle>;
};

const ComicDesc = ({ desc, style }: ComicDescProps) => {
  const tagBackground = useThemeColor("tagBackground");
  const icon = useThemeColor("icon");
  return (
    <View style={[{ paddingRight: 8 }, style]}>
      <ReadMore
        numberOfLines={4}
        renderTruncatedFooter={(onPress) => (
          <TouchableOpacity onPress={onPress}>
            <View style={[styles.icon, { backgroundColor: tagBackground }]}>
              <IconSymbol name="chevron.down" size={12} color={icon} />
            </View>
          </TouchableOpacity>
        )}
        renderRevealedFooter={(onPress) => (
          <TouchableOpacity onPress={onPress}>
            <View style={[styles.icon, { backgroundColor: tagBackground }]}>
              <IconSymbol name="chevron.up" size={12} color={icon} />
            </View>
          </TouchableOpacity>
        )}
      >
        <ThemedText type="default">{desc}</ThemedText>
      </ReadMore>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginTop: -20,
    right: -8,
    alignSelf: "flex-end",
    width: 24,
    alignItems: "center",
    borderRadius: 6,
  },
});

export default memo(ComicDesc);
