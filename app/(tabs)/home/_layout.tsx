import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "主页" }} />
      <Stack.Screen name="most-follow" options={{ title: "最多收藏" }} />
      <Stack.Screen name="most-view" options={{ title: "最多阅读" }} />
      <Stack.Screen
        name="most-view-over"
        options={{ title: "最多阅读（完结）" }}
      />
      <Stack.Screen name="new" options={{ title: "新作" }} />
      <Stack.Screen name="update" options={{ title: "更新" }} />
    </Stack>
  );
}
