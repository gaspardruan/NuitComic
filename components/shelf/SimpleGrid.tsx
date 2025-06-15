import { useMemo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

type SimpleGridProps<ItemT> = {
  data: ItemT[];
  totalWidth: number;
  columnNum?: number;
  verticalGap: number;
  horizontalGap: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollEnabled?: boolean;
  renderItem: (item: ItemT, index: number) => React.ReactElement;
};

const calColumnNum = (totalWidth: number): number => {
  if (totalWidth < 600) {
    return 3;
  } else if (totalWidth < 768) {
    return 4;
  } else if (totalWidth < 1024) {
    return 5;
  }
  return 6;
};

export const SimpleGrid = <ItemT,>({
  data,
  totalWidth,
  columnNum,
  verticalGap,
  horizontalGap,
  scrollEnabled = true,
  contentContainerStyle,
  renderItem,
}: SimpleGridProps<ItemT>) => {
  const column = columnNum ?? calColumnNum(totalWidth);
  const itemWidth = (totalWidth - (column - 1) * horizontalGap) / column;
  const rows = useMemo(() => {
    const rowCount = Math.ceil(data.length / column);
    return Array.from({ length: rowCount }, (_, rowIndex) => {
      return data.slice(rowIndex * column, (rowIndex + 1) * column);
    });
  }, [data, column]);

  return (
    <ScrollView
      contentContainerStyle={[{ gap: verticalGap }, contentContainerStyle]}
      scrollEnabled={scrollEnabled}
    >
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={[styles.row, { gap: horizontalGap }]}>
          {row.map((item, index) => {
            const itemIndex = rowIndex * column + index;
            return (
              <View key={itemIndex} style={{ width: itemWidth }}>
                {renderItem(item, itemIndex)}
              </View>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
