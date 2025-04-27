import { Link, usePathname } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFound() {
  const pathname = usePathname();
  return (
    <View style={styles.container}>
      <Text>{pathname}</Text>
      <Link href="/home" style={styles.link}>
        Go to home screen!
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
  },
});
