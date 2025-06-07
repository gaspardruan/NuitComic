import { Dimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  clamp,
  runOnJS,
} from "react-native-reanimated";

const { width: containerWidth, height: containterHeight } =
  Dimensions.get("window");

export const useZoomPan = ({
  minScale = 1,
  maxScale = 3,
  onTap,
}: {
  minScale?: number;
  maxScale?: number;
  onTap?: () => void;
}) => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
      if (e.scale < 1 && scale.value >= 1 && savedScale.value !== 1) {
        translateX.value =
          (savedTranslateX.value * (scale.value - 1)) / (savedScale.value - 1);
        translateY.value =
          (savedTranslateY.value * (scale.value - 1)) / (savedScale.value - 1);
      }
    })
    .onEnd((e) => {
      const clamped = clamp(scale.value, minScale, maxScale);
      scale.value = withTiming(clamped, { duration: 200 });
      savedScale.value = clamped;
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      const s = scale.value;

      const scaledWidth = containerWidth * s;
      const scaledHeight = containterHeight * s;

      const maxX = (scaledWidth - containerWidth) / 2;
      const maxY = (scaledHeight - containterHeight) / 2;

      const nextX = savedTranslateX.value + e.translationX;
      const nextY = savedTranslateY.value + e.translationY;

      translateX.value = clamp(nextX, -maxX, maxX);
      translateY.value = clamp(nextY, -maxY, maxY);
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .hitSlop({ left: -50 });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .maxDistance(50)
    .onEnd(() => {
      if (scale.value === 1) {
        scale.value = withTiming(2, { duration: 200 });
        savedScale.value = 2;

        // 放大时可适当调整 translateX/Y，比如居中
        translateX.value = withTiming(0, { duration: 200 });
        translateY.value = withTiming(0, { duration: 200 });
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      } else {
        scale.value = withTiming(1, { duration: 200 });
        savedScale.value = 1;

        translateX.value = withTiming(0, { duration: 200 });
        translateY.value = withTiming(0, { duration: 200 });
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      }
    });

  const tap = Gesture.Tap()
    .numberOfTaps(1)
    .onEnd(() => {
      if (onTap) {
        runOnJS(onTap)();
      }
    });

  const gesture = Gesture.Simultaneous(
    Gesture.Native(),
    Gesture.Race(Gesture.Exclusive(doubleTap, tap), pinch, pan)
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return { gesture, animatedStyle };
};
