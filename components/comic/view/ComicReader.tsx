import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Dimensions, FlatList, ScrollView, StyleSheet } from "react-native";
import ComicImage from "./ComicImage";

type ComicReaderProps = {
  imageURLs: string[];
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const ComicReader = ({ imageURLs }: ComicReaderProps) => {
  const scale = useSharedValue(1);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = e.scale;
    })
    .onEnd(() => {
      scale.value = withTiming(1, { duration: 150 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <GestureDetector gesture={pinchGesture}>
      <Animated.View style={[styles.zoomContainer, animatedStyle]}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {imageURLs.map((uri) => (
            <ComicImage uri={uri} style={styles.image} />
          ))}
        </ScrollView>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  zoomContainer: {
    flex: 1,
  },
  contentContainer: {
    // alignItems: "center",
    // paddingVertical: 10,
    // gap: 10,
  },
  image: {},
});
