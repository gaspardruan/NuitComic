import { Comic } from "@/common/interface";
import { ThemedText } from "../ThemedText";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { formatSliceKeyword } from "@/common/util";
import { Link } from "expo-router";

type ComicRowProps = {
  comic: Comic;
};

export function ComicRow({ comic }: ComicRowProps) {
  return (
    <Link
      href={{
        pathname: "/comic/[id]",
        params: {
          id: comic.id,
          title: comic.title,
          cover: comic.cover,
          image: comic.image,
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
      <View style={styles.container}>
        <Image
          source={{
            uri: comic.image,
            headers: { Referer: "https://yymh.app/" },
          }}
          style={styles.coverContainer}
        />
        <View style={styles.infoContainer}>
          <ThemedText type="default" numberOfLines={1} ellipsizeMode="tail">
            {comic.title}
          </ThemedText>
          <ThemedText type="tag">
            {formatSliceKeyword(comic.keyword)}
          </ThemedText>
          <ThemedText type="tag" numberOfLines={3} ellipsizeMode="tail">
            {comic.desc}
          </ThemedText>
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 125,
    flexDirection: "row",
  },
  coverContainer: {
    height: "100%",
    aspectRatio: 0.75,
    borderRadius: 6,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 12,
    gap: 16,
  },
});
