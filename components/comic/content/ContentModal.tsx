import {
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  Animated,
  Dimensions,
} from "react-native";

import ThemedText from "../../ThemedText";
import { ComicChapter } from "@/common/interface";
import { useEffect, useRef } from "react";
import { IconSymbol } from "../../icon/IconSymbol";
import { ChapterList } from "./ChapterList";
import { useThemeColor } from "@/hooks/useThemeColor";

const { height } = Dimensions.get("window");
const inDuration = 450;
const outDuration = 250;

const iconSize = 18;
const iconPadding = 12;
const iconContentSize = 2 * iconPadding + iconSize;

type ContentModalProps = {
  chapters: ComicChapter[];
  isVisible: boolean;
  onClose: () => void;
};

export const ContentModal = ({
  isVisible,
  onClose,
  chapters,
}: ContentModalProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;

  const backgroundColor = useThemeColor("background");

  // hide the modal after sliding-out animation
  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: outDuration,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: height,
        duration: outDuration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  // slide in after the appearance of the modal
  useEffect(() => {
    if (isVisible) {
      // setModalVisible(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: inDuration,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: inDuration,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, fadeAnim, slideAnim]);

  return (
    <>
      <Modal visible={isVisible} animationType="none" transparent={true}>
        <Animated.View style={[styles.modalBackground, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={[styles.fullScreenTouchable]}
            onPress={handleClose}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.modalWrapper,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={[styles.modalContent, { backgroundColor }]}>
            <View style={styles.titleContainer}>
              <View
                style={{ width: iconContentSize, height: iconContentSize }}
              />
              <ThemedText type="subtitle">目录</ThemedText>
              <TouchableOpacity
                style={{ padding: iconPadding }}
                activeOpacity={0.5}
                onPress={handleClose}
              >
                <IconSymbol name="xmark" size={iconSize} />
              </TouchableOpacity>
            </View>
            <ChapterList chapters={chapters} onClose={onClose} />
          </View>
        </Animated.View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    height: "90%",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  modalContent: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 16,
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  modalBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)", // 半透明背景
  },
  fullScreenTouchable: {
    flex: 1,
  },
});
