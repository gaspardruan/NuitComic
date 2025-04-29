import { Comic } from "@/common/interface";
import { Link } from "expo-router";
import { View } from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "../ThemedText";
import { formatSliceKeyword } from "@/common/util";

type ComicCoverProps = {
  comic: Comic;
};

export function ComicCover({ comic }: ComicCoverProps) {
  return (
    <Link
      href={{
        pathname: "/comic/[id]",
        params: {
          id: comic.id,
          title: comic.title,
          image: comic.image,
          cover: comic.cover,
          score: comic.score,
          view: comic.view,
          keyword: comic.keyword,
          desc: comic.desc,
          author: comic.author,
          updateTime: comic.updateTime,
          isOver: comic.isOver,
        },
      }}
    >
      <View>
        <Image
          source={{
            uri: comic.image,
            headers: { Referer: "https://yymh.app/" },
          }}
          style={{ width: "100%", aspectRatio: 0.75, borderRadius: 6 }}
        />
        <View>
          <ThemedText type="default" numberOfLines={1} ellipsizeMode="tail">
            {comic.title}
          </ThemedText>
          <ThemedText type="tag">
            {formatSliceKeyword(comic.keyword)}
          </ThemedText>
        </View>
      </View>
    </Link>
  );
}
