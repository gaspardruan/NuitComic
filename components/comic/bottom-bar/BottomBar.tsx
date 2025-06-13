import { PropsWithChildren, createElement } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BlurTabBarBackground from "@/components/tab/TabBarBackground.ios";

type BottomBarProps = PropsWithChildren<{
  containerStyle?: StyleProp<ViewStyle>;
}>;

export const BottomBar = ({ children, containerStyle }: BottomBarProps) => {
  const inset = useSafeAreaInsets();
  const adjusted = inset.bottom < 10 ? 10 : inset.bottom;

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: adjusted, height: 50 + adjusted },
      ]}
    >
      {BlurTabBarBackground && createElement(BlurTabBarBackground)}
      <View style={containerStyle}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  barButton: {
    flex: 1,
    alignItems: "center",
  },
});
