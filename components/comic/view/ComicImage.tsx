import { Loading } from "@/components/Loading";
import { Image, ImageStyle, useImage } from "expo-image";
import { memo } from "react";
import { StyleProp } from "react-native";

type ComicImageProps = {
  uri: string;
  style: StyleProp<ImageStyle>;
};

const ComicImage = ({ uri, style }: ComicImageProps) => {
  const image = useImage({
    uri,
    headers: { Referer: "https://yymh.app/" },
  });

  if (!image) {
    return <Loading />;
  }

  const aspectRatio = image.width / image.height;

  return (
    <Image source={image} style={[{ width: "100%", aspectRatio }, style]} />
  );
};

export default memo(ComicImage);
