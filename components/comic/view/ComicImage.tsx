import { Image, ImageStyle, useImage } from "expo-image";
import { memo, useRef } from "react";
import { StyleProp, Dimensions } from "react-native";

type ComicImageProps = {
  uri: string;
  style: StyleProp<ImageStyle>;
  index: number;
  setRatio: (index: number, ratio: number) => void;
  getRatio: (index: number) => number;
};

const { width, height } = Dimensions.get("window");

const screenAspectRatio = width / height;

const ComicImage = ({
  uri,
  getRatio,
  setRatio,
  index,
  style,
}: ComicImageProps) => {
  const retryCount = useRef<number>(0);
  const image = useImage(
    {
      uri,
      headers: { Referer: "https://yymh.app/" },
    },
    {
      onError: (err, retry) => {
        if (retryCount.current < 3) {
          retry();
          retryCount.current++;
        } else {
          throw err;
        }
      },
    }
  );

  const lastRatio = getRatio(index);
  let ratio = lastRatio ?? screenAspectRatio;
  if (!lastRatio && image) {
    ratio = image.width / image.height;
    setRatio(index, ratio);
  }

  return (
    <Image
      source={image}
      placeholder={require("@/assets/images/placeholder.png")}
      style={[
        { width: "100%", aspectRatio: ratio, backgroundColor: "rgb(1, 1, 1)" },
        style,
      ]}
      placeholderContentFit="contain"
      transition={250}
    />
  );
};

export default memo(ComicImage);
