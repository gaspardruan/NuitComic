import { getGuessLikeComic } from "@/axios/comic";
import { Section } from "./ComicSection";
import { memo, useEffect, useState } from "react";
import { Comic } from "@/common/interface";
import { StyleProp, ViewStyle } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

type GuessLikeProps = {
  useSecondaryBackground?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const GuessLike = ({
  style,
  useSecondaryBackground,
}: GuessLikeProps) => {
  const [guess, setGuess] = useState<Comic[]>([]);
  const guessLike = () => {
    getGuessLikeComic().then((res) => {
      setGuess(res);
    });
  };

  const tagBackgroundColor = useThemeColor("tagBackground");
  const bg = useSecondaryBackground ? tagBackgroundColor : undefined;

  useEffect(() => {
    guessLike();
  }, []);

  return (
    <Section
      title="猜你喜欢"
      comics={guess}
      icon="arrow.trianglehead.2.clockwise"
      headerAction={guessLike}
      style={[{ backgroundColor: bg }, style]}
    />
  );
};

export default memo(GuessLike);
