import { getRandomLikeComic } from "@/axios/comic";
import { Section } from "./ComicSection";
import { memo, useEffect, useState } from "react";
import { Comic } from "@/common/interface";
import { StyleProp, ViewStyle } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

type GuessLikeProps = {
  useSecondaryBackground?: boolean;
  style?: StyleProp<ViewStyle>;
  totalWidth: number;
};

export const RandomLike = ({ style, useSecondaryBackground, totalWidth }: GuessLikeProps) => {
  const [guess, setGuess] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);
  const randomLike = () => {
    getRandomLikeComic().then((res) => {
      setGuess(res);
    });
  };

  const tagBackgroundColor = useThemeColor("tagBackground");
  const bg = useSecondaryBackground ? tagBackgroundColor : undefined;

  useEffect(() => {
    randomLike();
    setLoading(false);
  }, []);

  return (
    <Section
      title="大家都在看"
      comics={guess}
      icon="arrow.trianglehead.2.clockwise"
      headerAction={randomLike}
      totalWidth={totalWidth}
      style={[{ backgroundColor: bg, opacity: loading ? 0 : 1 }, style]}
    />
  );
};

export default memo(RandomLike);
