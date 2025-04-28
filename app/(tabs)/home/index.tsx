import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useHeaderHeight } from "@react-navigation/elements";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
  const [showHeader, setShowHeader] = useState(false);
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const yOffset = 24;
  const scrollThreshold = headerHeight - insets.top - yOffset;

  const textColor = useThemeColor("text");

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y < scrollThreshold && showHeader) {
      setShowHeader(false);
    } else if (
      e.nativeEvent.contentOffset.y >= scrollThreshold &&
      !showHeader
    ) {
      setShowHeader(true);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: showHeader ? "主页" : "",
          headerTransparent: true,
          headerBlurEffect: showHeader ? "systemChromeMaterial" : "none",
          headerShadowVisible: showHeader,
          headerTintColor: textColor,
        }}
      />

      <ScrollView
        onScroll={onScroll}
        style={[styles.scrollContainer, { marginTop: headerHeight }]}
      >
        <ThemedText
          type="title"
          style={[styles.title, { marginTop: -yOffset }]}
        >
          主页
        </ThemedText>
        <View style={[styles.container, { backgroundColor: "green" }]}>
          <Link href="/home/most-follow">Go to Most Follow</Link>
        </View>
        <View style={[styles.container, { backgroundColor: "blue" }]}>
          <Link href="/home/most-view">Go to Most Follow</Link>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    overflow: "visible",
    paddingHorizontal: 20,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
    height: 1000,
  },
  title: {
    // marginTop: -28,
  },
});
