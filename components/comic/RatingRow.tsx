import { View } from "react-native";
import ThemedText from "../ThemedText";
import { Rating } from "react-native-ratings";
import { useThemeColor } from "@/hooks/useThemeColor";
import { memo } from "react";

type RatingRowProps = {
  score: string;
};

const RatingRow = ({ score }: RatingRowProps) => {
  const scoreNum = Math.max(0, Number(score)) / 2;
  const backgroundColor = useThemeColor("background");
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
      <ThemedText type="tag">{score}</ThemedText>
      <Rating
        readonly
        fractions={3}
        imageSize={12}
        startingValue={scoreNum}
        tintColor={backgroundColor}
      />
    </View>
  );
};

export default memo(RatingRow);
