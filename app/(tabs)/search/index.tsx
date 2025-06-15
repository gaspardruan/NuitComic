import { ContentWidth, HorizontalGap, ReduntantBottomHeight } from "@/common/constant";
import GuessLike from "@/components/GuessLike";
import RandomLike from "@/components/RandomLike";
import { useHeaderHeight } from "@react-navigation/elements";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function SearchScreen() {
  const headerHeight = useHeaderHeight();

  return (
    <>
      <Stack.Screen
        options={{
          title: "搜索",
          headerTransparent: true,
          headerBlurEffect: "systemChromeMaterial",
          // headerShadowVisible: false,
          headerSearchBarOptions: {
            placeholder: "搜索漫画",
            cancelButtonText: "取消",
            onChangeText: (e) => {
              console.log("Search text changed:", e.nativeEvent.text);
            },
          },
        }}
      />

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={{ marginTop: headerHeight, overflow: "visible" }}
      >
        <RandomLike totalWidth={ContentWidth} />
        <GuessLike totalWidth={ContentWidth} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: 32,
    paddingBottom: ReduntantBottomHeight,
    paddingHorizontal: HorizontalGap,
    paddingTop: HorizontalGap,
  },
});
