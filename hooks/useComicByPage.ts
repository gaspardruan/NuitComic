import { Comic } from "@/common/interface";
import { useInfiniteQuery } from "@tanstack/react-query";

type ComicRequest = (page?: number) => Promise<[Comic[], boolean]>;

export function useComicByPage(request: ComicRequest): [Comic[], () => void] {
  const fetchComics = async ({ pageParam = 1 }) => {
    const [data, isLast] = await request(pageParam);
    return { data, isLast };
  };

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: [request.name],
    queryFn: fetchComics,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.isLast ? undefined : allPages.length + 1;
    },
  });

  const comics = data?.pages.flatMap((page) => page.data) || [];

  return [comics, fetchNextPage];
}
