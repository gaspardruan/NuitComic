import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

export const useFadeIn = () => {
  const opacity = useSharedValue(0);
  const fadeInStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return { opacity, fadeInStyle };
};
