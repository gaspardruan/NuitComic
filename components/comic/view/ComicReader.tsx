import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { withTiming } from "react-native-reanimated";
import { FlatList, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useQuery } from "@tanstack/react-query";
import { useFadeIn } from "@/hooks/useFadeIn";
import { ComicChapter } from "@/common/interface";
import { getAbsoluteImageURLs } from "@/common/util";
import { useZoomPan } from "@/hooks/useZoomPan";
import ComicImage from "./ComicImage";
import { Error } from "@/components/Error";
import { Loading } from "@/components/Loading";

type ComicReaderProps = {
  chapters: ComicChapter[];
  id: string;
  index: number;
};

async function prefetchImages(imageURLs: string[]) {
  const ok = await Image.prefetch(imageURLs);
  return ok;
}

export const ComicReader = ({ chapters, id, index }: ComicReaderProps) => {
  const _imageURLs = useMemo(
    () =>
      chapters.length === 0
        ? []
        : getAbsoluteImageURLs(chapters[index].imageList),
    [chapters, index]
  );
  const [imageURLs, setImageURLs] = useState<string[]>(_imageURLs);
  const [curIndex, setCurIndex] = useState<number>(index);

  // animation
  // const { pinchGesture, animatedStyle } = usePinch();
  // const { panGesture, animatedStyle: panStyle } = usePan();
  // const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);
  const { gesture, animatedStyle } = useZoomPan({
    minScale: 1,
    maxScale: 3,
  });
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

  const loadNextChapter = () => {
    if (curIndex < chapters.length - 1) {
      const next = getAbsoluteImageURLs(chapters[curIndex + 1].imageList);
      setCurIndex(curIndex + 1);
      setImageURLs(imageURLs.concat(next));
    }
  };

  const onEndReached = () => {
    loadNextChapter();
  };

  // fadeIn once loaded
  useEffect(() => {
    if (!isLoading && !isError && imageURLs.length > 0) {
      opacity.value = withTiming(1, { duration: 250 });
    }
  }, [isLoading, isError, opacity, imageURLs.length]);

  // ensure imageURLs is consistent with chatpers[index]
  useEffect(() => {
    if (_imageURLs.length > imageURLs.length) {
      setImageURLs(_imageURLs);
    }
  }, [_imageURLs, imageURLs]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error error={error?.message} />;
  }

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.zoomContainer, fadeInStyle, animatedStyle]}>
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
          onEndReachedThreshold={4}
          contentContainerStyle={styles.contentContainer}
          // showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={7}
          maxToRenderPerBatch={14}
          windowSize={15}
          removeClippedSubviews={false}
          renderToHardwareTextureAndroid={true}
        />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  zoomContainer: {
    // flex: 1,
  },
  contentContainer: {
    // alignItems: "center",
    // paddingVertical: 10,
    // gap: 10,
  },
  image: {},
});
