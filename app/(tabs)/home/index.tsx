import { Link, Stack } from "expo-router";
import { Text, View, StyleSheet, ScrollView } from "react-native";

export default function Home() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "主页",
        }}
      />
      <ScrollView style={styles.root}>
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
  root: {
    marginTop: -40,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    height: 1000,
  },
});
