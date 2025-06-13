import { HorizontalGap, ReduntantBottomHeight, YOffset } from "@/common/constant";
import { tintColorLight } from "@/common/theme";
import ThemedText from "@/components/ThemedText";
import { useUIStore } from "@/state/ui";
import { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Gap = 8;

export default function Home() {
  const headerHeight = useUIStore((state) => state.headerHeight);
  const top = headerHeight - YOffset;

  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <View style={[styles.container, { marginTop: top }]}>
      <ThemedText type="title" style={styles.title}>
        书架
      </ThemedText>
      <View style={styles.tab}>
        <TouchableOpacity onPress={() => setActiveTab(0)} activeOpacity={1} hitSlop={Gap}>
          <ThemedText type="medium" style={activeTab === 0 ? { color: tintColorLight } : {}}>
            最近收藏
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab(1)} activeOpacity={1} hitSlop={Gap}>
          <ThemedText type="medium" style={activeTab === 1 ? { color: tintColorLight } : {}}>
            最近在看
          </ThemedText>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
      >
        {/* Placeholder for content */}
        <ThemedText type="default">这里是书架内容</ThemedText>
        <ThemedText type="default">可以添加漫画到书架</ThemedText>
        <ThemedText type="default">管理你的漫画收藏</ThemedText>
        <ThemedText type="default">查看阅读历史</ThemedText>
        <ThemedText type="default">这里是书架内容</ThemedText>
        <ThemedText type="default">可以添加漫画到书架</ThemedText>
        <ThemedText type="default">管理你的漫画收藏</ThemedText>
        <ThemedText type="default">查看阅读历史</ThemedText>
        <ThemedText type="default">这里是书架内容</ThemedText>
        <ThemedText type="default">可以添加漫画到书架</ThemedText>
        <ThemedText type="default">管理你的漫画收藏</ThemedText>
        <ThemedText type="default">查看阅读历史</ThemedText>
        <ThemedText type="default">这里是书架内容</ThemedText>
        <ThemedText type="default">可以添加漫画到书架</ThemedText>
        <ThemedText type="default">管理你的漫画收藏</ThemedText>
        <ThemedText type="default">查看阅读历史</ThemedText>
        <ThemedText type="default">这里是书架内容</ThemedText>
        <ThemedText type="default">可以添加漫画到书架</ThemedText>
        <ThemedText type="default">管理你的漫画收藏</ThemedText>
        <ThemedText type="default">查看阅读历史</ThemedText>
        <ThemedText type="default">这里是书架内容</ThemedText>
        <ThemedText type="default">可以添加漫画到书架</ThemedText>
        <ThemedText type="default">管理你的漫画收藏</ThemedText>
        <ThemedText type="default">查看阅读历史</ThemedText>
        <ThemedText type="default">这里是书架内容</ThemedText>
        <ThemedText type="default">可以添加漫画到书架</ThemedText>
        <ThemedText type="default">管理你的漫画收藏</ThemedText>
        <ThemedText type="default">查看阅读历史</ThemedText>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // gap: 24,
  },
  title: {
    paddingHorizontal: HorizontalGap,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: HorizontalGap,
    paddingTop: HorizontalGap,
    paddingBottom: Gap,
    paddingHorizontal: HorizontalGap,
  },
  scrollContainer: {
    paddingHorizontal: HorizontalGap,
    paddingBottom: ReduntantBottomHeight,
    paddingTop: HorizontalGap - Gap,
  },
});
