import { Comic } from "@/common/interface";
import { IconSymbol, IconSymbolName } from "@/components/icon/IconSymbol";
import { StyleProp, View, ViewStyle, StyleSheet, TouchableOpacity } from "react-native";
import ThemedText from "@/components/ThemedText";
import { ComicCover } from "@/components/home/ComicCover";
import { SimpleGrid } from "./shelf/SimpleGrid";
import { SectionInnerGap } from "@/common/constant";

type HomeSectionProps = {
  title: string;
  comics: Comic[];
  icon?: IconSymbolName;
  headerAction?: () => void;
  style?: StyleProp<ViewStyle>;
  totalWidth: number;
};

export function Section({
  title,
  comics,
  icon = "chevron.right",
  style,
  totalWidth,
  headerAction,
}: HomeSectionProps) {
  return (
    <View style={[styles.sectionContainer, style]}>
      {headerAction ? (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.sectionTitleContainer}
          onPress={headerAction}
        >
          <ThemedText type="subtitle">{title}</ThemedText>
          <IconSymbol name={icon} size={20} weight="bold" />
        </TouchableOpacity>
      ) : (
        <ThemedText type="subtitle">{title}</ThemedText>
      )}
      <SimpleGrid
        data={comics}
        totalWidth={totalWidth}
        verticalGap={SectionInnerGap}
        horizontalGap={SectionInnerGap}
        scrollEnabled={false}
        renderItem={(item) => <ComicCover comic={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    gap: 16,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
