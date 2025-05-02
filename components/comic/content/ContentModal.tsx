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
import { useEffect, useRef, useState } from "react";
import { IconSymbol } from "../../icon/IconSymbol";
import { ChapterList } from "./ChapterList";
import { useThemeColor } from "@/hooks/useThemeColor";

const { height } = Dimensions.get("window");
const inDuration = 450;
const outDuration = 250;

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
  const [isModalVisible, setModalVisible] = useState(isVisible);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;

  const backgroundColor = useThemeColor("background");

  console.log("ContentModal render");

  useEffect(() => {
    if (isVisible) {
      setModalVisible(true);
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
    } else {
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
        setModalVisible(false);
        slideAnim.setValue(height);
      });
    }
  }, [isVisible, fadeAnim, slideAnim]);

  return (
    <>
      <Modal visible={isModalVisible} animationType="none" transparent={true}>
        <Animated.View style={[styles.modalBackground, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={[styles.fullScreenTouchable]}
            onPress={onClose}
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
              <View style={{ width: 34, height: 34 }} />
              <ThemedText type="subtitle">目录</ThemedText>
              <TouchableOpacity
                style={{ padding: 8 }}
                activeOpacity={0.5}
                onPress={onClose}
              >
                <IconSymbol name="xmark" size={18} />
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
