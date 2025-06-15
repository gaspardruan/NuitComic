import { Image, ImageStyle } from "expo-image";
import { memo } from "react";
import { StyleProp } from "react-native";

type ComicImageProps = {
  uri: string;
  style: StyleProp<ImageStyle>;
  aspectRatio: number;
};

const ComicImageWithSize = ({ uri, aspectRatio, style }: ComicImageProps) => {
  return (
    <Image
      source={{
        uri,
        headers: { Referer: "https://yymh.app/" },
      }}
      placeholder={require("@/assets/images/placeholder.png")}
      style={[{ width: "100%", aspectRatio, backgroundColor: "rgb(1, 1, 1)" }, style]}
      placeholderContentFit="contain"
    />
  );
};

export default memo(ComicImageWithSize);
