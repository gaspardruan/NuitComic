import { GestureDetector } from "react-native-gesture-handler";
import Animated, { withTiming } from "react-native-reanimated";
import { FlatList, StyleSheet } from "react-native";
import ComicImage from "./ComicImage";
import { Image } from "expo-image";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/components/Loading";
import { Error } from "@/components/Error";
import { useCallback, useEffect, useRef } from "react";
import { usePinch } from "@/hooks/usePinch";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useRouter } from "expo-router";

type ComicReaderProps = {
  imageURLs: string[];
  id: string;
  index: string;
};

async function prefetchImages(imageURLs: string[]) {
  const ok = await Image.prefetch(imageURLs);
  return ok;
}

export const ComicReader = ({ imageURLs, id, index }: ComicReaderProps) => {
  // animation
  const { pinchGesture, animatedStyle } = usePinch();
  const { opacity, fadeInStyle } = useFadeIn();

  // record the ratio of each image
  const ratios = useRef<number[]>(Array(imageURLs.length));

  const setRatio = useCallback((index: number, ratio: number) => {
    ratios.current[index] = ratio;
  }, []);

  const getRatio = useCallback((index: number) => {
    return ratios.current[index];
  }, []);

  // prefetch images
  const { isLoading, isError, error } = useQuery({
    queryKey: ["comicImages", id, index],
    queryFn: () => prefetchImages(imageURLs),
    enabled: imageURLs.length > 0,
  });

  const router = useRouter();
  const onEndReached = () => {
    router.replace({
      pathname: "./view",
      params: { index: String(Number(index) + 1) },
    });
  };

  useEffect(() => {
    if (!isLoading && !isError) {
      opacity.value = withTiming(1, { duration: 250 });
    }
  }, [isLoading, isError, opacity]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error error={error?.message} />;
  }

  return (
    <GestureDetector gesture={pinchGesture}>
      <Animated.View style={[styles.zoomContainer, animatedStyle, fadeInStyle]}>
        <FlatList
          data={imageURLs}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => (
            <ComicImage
              uri={item}
              index={index}
              getRatio={getRatio}
              setRatio={setRatio}
              style={styles.image}
            />
          )}
          onEndReached={onEndReached}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={11}
        />
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
