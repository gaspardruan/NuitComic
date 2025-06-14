import { StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import { Image } from "expo-image";
import ThemedText from "@/components/ThemedText";
import { Comic } from "@/common/interface";
import { useQuery } from "@tanstack/react-query";
import { getComicChapterNum } from "@/axios/comic";

type ComicReadCoverProps = {
  comic: Comic;
  lastRead: number;
};

export function ComicReadCover({ comic, lastRead }: ComicReadCoverProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["chapterNum", comic.id],
    queryFn: async () => getComicChapterNum(comic.id),
  });

  const total = data ?? 0;

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
          placeholder={require("@/assets/images/smile.png")}
          source={{
            uri: comic.image,
            headers: { Referer: "https://yymh.app/" },
          }}
          style={styles.container}
          placeholderContentFit="contain"
          transition={100}
        />
        <View>
          <ThemedText type="default" numberOfLines={1} ellipsizeMode="tail">
            {comic.title}
          </ThemedText>
          <ThemedText type="tag">
            {lastRead + 1}话/{isLoading ? "-" : total}话{comic.isOver === "1" ? "(完结)" : ""}
          </ThemedText>
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 0.75,
    borderRadius: 6,
    alignContent: "center",
    justifyContent: "center",
  },
});
