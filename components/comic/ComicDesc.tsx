import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
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
            <View
              style={{
                marginTop: -20,
                right: -8,
                backgroundColor: tagBackground,
                alignSelf: "flex-end",
                width: 24,
                alignItems: "center",
                borderRadius: 6,
              }}
            >
              <IconSymbol
                name="chevron.down"
                size={12}
                color={icon}
                style={{}}
              />
            </View>
          </TouchableOpacity>
        )}
        renderRevealedFooter={(onPress) => (
          <TouchableOpacity onPress={onPress}>
            <View
              style={{
                marginTop: -18,
                right: -8,
                backgroundColor: tagBackground,
                alignSelf: "flex-end",
                width: 24,
                alignItems: "center",
                borderRadius: 6,
              }}
            >
              <IconSymbol name="chevron.up" size={12} color={icon} style={{}} />
            </View>
          </TouchableOpacity>
        )}
      >
        <ThemedText type="default">{desc}</ThemedText>
      </ReadMore>
    </View>
  );
};

export default memo(ComicDesc);
