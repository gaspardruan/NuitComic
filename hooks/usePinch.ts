import { Gesture } from "react-native-gesture-handler";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const usePinch = () => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      // 限制缩放范围并平滑回弹
      const clamped = Math.max(1, Math.min(scale.value, 3));
      scale.value = withTiming(clamped, { duration: 200 });
      savedScale.value = clamped;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return { pinchGesture, animatedStyle };
};
