import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "主页" }} />
      <Stack.Screen name="most-follow" options={{ title: "最多收藏" }} />
      <Stack.Screen name="most-view" options={{ title: "最多观看" }} />
    </Stack>
  );
}
