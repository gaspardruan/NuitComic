import { useScrollOffset } from "@/hooks/useScrollOffset";
import { useHeaderHeight } from "@react-navigation/elements";
import { Stack } from "expo-router";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

export default function Home() {
  const headerHeight = useHeaderHeight();
  const topGap = 4;

  const [textY, setTextY] = useState(0);

  const [showHeader, onScrollForHeader] = useScrollOffset(topGap);
  const [showTitle, onScrollForTitle] = useScrollOffset(textY - headerHeight);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    onScrollForHeader(e);
    onScrollForTitle(e);
  };

  const onTextLayout = (e: any) => {
    const { y, height } = e.nativeEvent.layout;
    setTextY(y + height + headerHeight + topGap);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: showTitle ? "Comic Details" : "",
          headerShown: true,
          headerTransparent: true,
          headerBackButtonDisplayMode: "minimal",
          headerBlurEffect: showHeader ? "systemChromeMaterial" : "none",
          headerShadowVisible: showHeader,
        }}
      />
      <ScrollView
        style={{ paddingTop: headerHeight + topGap }}
        onScroll={onScroll}
      >
        <View
          style={{
            height: 700,
            backgroundColor: "blue",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text onLayout={onTextLayout}>Comic Details</Text>
        </View>
        <View style={{ height: 700, backgroundColor: "green" }}>
          <Text>Comic Details</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
