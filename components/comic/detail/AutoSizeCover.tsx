import { Image, ImageProps, useImage } from "expo-image";
import { memo, useState } from "react";
import { DimensionValue } from "react-native";

type AutoSizedImageProps = ImageProps & {
  uri: string;
  fallbackUri: string;
};

const AutoSizedCover = ({ uri, fallbackUri, style, ...rest }: AutoSizedImageProps) => {
  const [isError, setIsError] = useState(false);
  const onError = () => {
    if (!isError) {
      setIsError(true);
      console.warn("Image loading failed, using fallback image.");
    }
  };

  const image = useImage(
    {
      uri,
      headers: { Referer: "https://yymh.app/" },
    },
    { onError: onError }
  );

  const width = image?.width;
  const height = image?.height;

  let isWidthLarger = true;
  let aspectRatio = isError ? 0.75 : 400 / 208;
  let borderRadius = isError ? 12 : 6;
  let w: DimensionValue = isError ? "39%" : "100%";

  if (width && height) {
    isWidthLarger = width > height;
    aspectRatio = isWidthLarger ? 400 / 208 : 0.75;
    borderRadius = isWidthLarger ? 6 : 12;
    w = isWidthLarger ? "100%" : "39%";
  }

  console.log(fallbackUri);
  console.log(uri);
  console.log(isError);

  return (
    <Image
      source={
        isError
          ? {
              uri: fallbackUri,
              headers: { Referer: "https://yymh.app/" },
            }
          : image
      }
      style={[
        {
          width: w,
          aspectRatio,
          borderRadius,
        },
        style,
      ]}
      {...rest}
    />
  );
};

export default memo(AutoSizedCover);
