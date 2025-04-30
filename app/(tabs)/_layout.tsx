import { Tabs } from "expo-router";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/icon/IconSymbol";
import TabBarBackgaround from "@/components/tab/TabBarBackground";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackgaround,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
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
