import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text>This screen doesn't exist.</Text>
      <Link href="/" style={styles.link}>
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
