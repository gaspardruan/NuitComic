import { Comic } from "@/common/interface";
import { IconSymbol, IconSymbolName } from "../icon/IconSymbol";
import {
  StyleProp,
  View,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { SimpleGrid } from "react-native-super-grid";
import { ComicCover } from "./ComicCover";

type HomeSectionProps = {
  title: string;
  comics: Comic[];
  icon?: IconSymbolName;
  headerAction?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Section({
  title,
  comics,
  icon = "chevron.right",
  style,
  headerAction,
}: HomeSectionProps) {
  const space = 12;
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
        listKey="new"
        data={comics}
        spacing={space}
        style={{ marginHorizontal: -space, marginVertical: -space }}
        itemDimension={0}
        maxItemsPerRow={3}
        renderItem={({ item }) => {
          return ComicCover({ comic: item });
        }}
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
