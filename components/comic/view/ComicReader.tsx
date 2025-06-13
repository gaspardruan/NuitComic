import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { withTiming } from "react-native-reanimated";
import { FlatList, StyleSheet, ViewToken } from "react-native";
import { Image } from "expo-image";
import { useQuery } from "@tanstack/react-query";
import { useFadeIn } from "@/hooks/useFadeIn";
import { ComicChapter, ShowImage } from "@/common/interface";
import { getShowImages } from "@/common/util";
import { useZoomPan } from "@/hooks/useZoomPan";
import ComicImage from "./ComicImage";
import { Error } from "@/components/Error";
import { Loading } from "@/components/Loading";

type ComicReaderProps = {
  chapters: ComicChapter[];
  id: string;
  index: number;
  onUpdateChapter?: (chapterIndex: number) => void;
  onTap?: () => void;
  onScrollBeginDrag?: () => void;
};

async function prefetchImages(imageURLs: string[]) {
  const ok = await Image.prefetch(imageURLs);
  return ok;
}

const ComicReader = ({
  chapters,
  id,
  index,
  onUpdateChapter,
  onTap,
  onScrollBeginDrag,
}: ComicReaderProps) => {
  // initShowImages are possibly empty, which depends on the useQuery expiration
  const initShowImages = useMemo(
    () => (chapters.length === 0 ? [] : getShowImages(chapters, index)),
    [chapters, index]
  );
  const [showImages, setShowImages] = useState<ShowImage[]>(initShowImages);

  // nextIndex is the recently loaded chpater index, always increments
  const [nextIndex, setNextIndex] = useState<number>(index);

  const { gesture, animatedStyle } = useZoomPan({
    minScale: 1,
    maxScale: 3,
    onTap,
  });

  // opacity is transition from loading to loaded
  const { opacity, fadeInStyle } = useFadeIn();

  // ratios are records the ratio of each image, which is mandatory for expo-image,
  // initial value is a full screen ratio
  const ratios = useRef<number[]>(Array(showImages.length));
  const setRatio = useCallback((index: number, ratio: number) => {
    ratios.current[index] = ratio;
  }, []);
  const getRatio = useCallback((index: number) => {
    return ratios.current[index];
  }, []);

  // prefetch images
  const { isLoading, isError, error } = useQuery({
    queryKey: ["comicImages", id, index],
    queryFn: () => prefetchImages(showImages.map((s) => s.url)),
    enabled: showImages.length > 0,
  });

  const loadNextChapter = () => {
    if (nextIndex < chapters.length - 1) {
      const next = getShowImages(chapters, nextIndex + 1);
      setNextIndex(nextIndex + 1);
      setShowImages(showImages.concat(next));
    }
  };
  const onEndReached = () => {
    loadNextChapter();
  };

  // currentChapterIndex is the actually visible chapter
  const currentChapterIndex = useRef<number>(index);
  const viewConfigRef = useRef({
    itemVisiblePercentThreshold: 50,
  });
  const onViewChange = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].item.chapterIndex !== currentChapterIndex) {
        currentChapterIndex.current = viewableItems[0].item.chapterIndex;
        onUpdateChapter?.(currentChapterIndex.current);
      }
    },
    [onUpdateChapter]
  );

  // fadeIn once loaded
  useEffect(() => {
    if (!isLoading && !isError && showImages.length > 0) {
      opacity.value = withTiming(1, { duration: 250 });
    }
  }, [isLoading, isError, opacity, showImages.length]);

  // ensure showImages is consistent with chatpers[index]
  useEffect(() => {
    if (initShowImages.length > showImages.length) {
      setShowImages(initShowImages);
    }
  }, [initShowImages, showImages]);

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
          data={showImages}
          keyExtractor={(item) => item.key}
          renderItem={({ item, index }) => (
            <ComicImage
              uri={item.url}
              index={index}
              getRatio={getRatio}
              setRatio={setRatio}
              style={styles.image}
            />
          )}
          onEndReached={onEndReached}
          onEndReachedThreshold={4}
          onScrollBeginDrag={onScrollBeginDrag}
          onViewableItemsChanged={onViewChange}
          viewabilityConfig={viewConfigRef.current}
          contentContainerStyle={styles.contentContainer}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
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
  zoomContainer: {},
  contentContainer: {},
  image: {},
});

export default memo(ComicReader);
