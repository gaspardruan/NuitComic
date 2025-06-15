import { ContentWidth } from "@/common/constant";
import GuessLike from "@/components/GuessLike";
// import { useHeaderHeight } from "@react-navigation/elements";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function SearchScreen() {
  // const headerHeight = useHeaderHeight();
  // console.log(headerHeight);
  return (
    <>
      <Stack.Screen
        options={{
          title: "搜索",
          // headerTransparent: true,
          // headerBlurEffect: "systemChromeMaterial",
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
      <View>
        <GuessLike totalWidth={ContentWidth} />
      </View>
    </>
  );
}
