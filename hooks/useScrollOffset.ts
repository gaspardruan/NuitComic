import { useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

export const useScrollOffset = (
  threshold: number
): [boolean, (e: NativeSyntheticEvent<NativeScrollEvent>) => void] => {
  const [reach, setReach] = useState(false);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y < threshold && reach) {
      setReach(false);
    } else if (e.nativeEvent.contentOffset.y >= threshold && !reach) {
      setReach(true);
    }
  };
  return [reach, onScroll];
};
