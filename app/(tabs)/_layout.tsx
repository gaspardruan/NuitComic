import { IconSymbol } from "@/components/icon/IconSymbol";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "主页",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shelf"
        options={{
          title: "书架",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="books.vertical.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
