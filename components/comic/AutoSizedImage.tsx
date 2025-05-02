import { Image, ImageProps, useImage } from "expo-image";
import { memo, useState } from "react";
import { DimensionValue } from "react-native";

type AutoSizedImageProps = ImageProps & {
  uri: string;
  fallbackUri: string;
};

const AutoSizedImage = ({
  uri,
  fallbackUri,
  style,
  ...rest
}: AutoSizedImageProps) => {
  const [isError, setIsError] = useState(false);
  const onError = () => {
    if (!isError) {
      setIsError(true);
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
  let aspectRatio = isError ? 0.75 : 400 / 213;
  let borderRadius = isError ? 12 : 6;
  let w: DimensionValue = isError ? "40%" : "100%";

  if (width && height) {
    isWidthLarger = width > height;
    aspectRatio = isWidthLarger ? 400 / 213 : 0.75;
    borderRadius = isWidthLarger ? 6 : 12;
    w = isWidthLarger ? "100%" : "40%";
  }

  return (
    <Image
      source={isError ? fallbackUri : image}
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

export default memo(AutoSizedImage);
