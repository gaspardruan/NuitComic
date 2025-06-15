import { Comic, ComicChapter, IndexComicData } from "@/common/interface";
import { formatTimeToDate, imageBaseURL } from "@/common/util";
import axios from "axios";

const pageSize = 20;

axios.defaults.baseURL = "https://yymh.app/home/api";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.timeout = 5000;

axios.interceptors.request.use((request) => {
  console.log("Request:", {
    method: request.method,
    url: request.url,
    data: request.data,
  });
  return request;
});

const _post = async (url: string, data: any): Promise<Comic[]> => {
  try {
    const res = await axios.post(url, data);
    const comics = res.data.data;
    refineComic(comics);
    return comics;
  } catch (error) {
    logError(error);
  }
  return [];
};

const _get = async (url: string): Promise<[Comic[], boolean]> => {
  try {
    const res = await axios.get(url);
    const comics = res.data.result.list;
    const lastPage = res.data.result.lastPage;
    refineComic(comics);
    return [comics, lastPage];
  } catch (error) {
    logError(error);
  }
  return [[], true];
};

export const getBannerComic = async () => await _post("/getbanner.html", { type: 1, limit: 5 });

export const getUpdatedComic = async () =>
  await _post("/getbook.html", {
    type: 1,
    limit: 6,
    start: 0,
    order: "update_time desc",
  });

export const getMostViewComic = async (start = 0, limit = 6) =>
  await _post("/getbook.html", {
    type: 1,
    limit: limit,
    start: start,
    order: "view desc",
  });

export const getMostViewComicByPage = async (page = 1): Promise<[Comic[], boolean]> => {
  const start = (page - 1) * pageSize;
  return [await getMostViewComic(start, pageSize), false];
};

export const getMostFollowComic = async (start = 0, limit = 6) =>
  await _post("/getbook.html", {
    type: 1,
    limit: limit,
    start: start,
    order: "mark desc",
  });

export const getMostFollowComicByPage = async (page = 1): Promise<[Comic[], boolean]> => {
  const start = (page - 1) * pageSize;
  return [await getMostFollowComic(start, pageSize), false];
};

export const getMostViewOverComic = async (start = 0, limit = 6) =>
  await _post("/getbook.html", {
    type: 1,
    limit: limit,
    start: start,
    mhstatus: 1,
    order: "view desc",
  });

export const getMostViewOverComicByPage = async (page = 1): Promise<[Comic[], boolean]> => {
  const start = (page - 1) * pageSize;
  return [await getMostViewOverComic(start, pageSize), false];
};

export const getNewComic = async (start = 0, limit = 6) =>
  await _post("/getbook.html", {
    type: 1,
    limit: limit,
    start: start,
    order: "id desc",
  });

export const getRandomComic = async () =>
  await _post("/getbook.html", { type: 1, limit: 6, fz: 2 });

export const getGuessLikeComic = async () => await _post("/getcnxh.html", { type: 1, limit: 6 });

export const getRandomLikeComic = async () => await _post("/getjphc.html", { fz: 1, limit: 6 });

export const getUpdatedComicByPage = async (page = 1) => await _get(`/cate/tp/1-0-0-1-${page}`);

export const getRecommendComicByPage = async (page = 1) =>
  await _get(`/getpage/tp/1-recommend-${page}`);

export const getNewComicByPage = async (page = 1): Promise<[Comic[], boolean]> => {
  const start = (page - 1) * pageSize;
  return [await getNewComic(start, pageSize), false];
};

export const getMostSerchComic = async (): Promise<Comic[]> => {
  const res = await axios.get("/rank/type/1");
  const comics = res.data.result.most_search;
  // 删除最后一个元素
  if (comics.length === 10) comics.pop();
  refineComic(comics);
  return comics;
};

export const getHomeComic = async (): Promise<{
  new: Comic[];
  recommand: Comic[];
}> => {
  try {
    const res = await axios.get("/yymhindex.html");
    const data = res.data.data;
    const newComics = data.jphc1.data.concat(data.jphc2.data);
    const recommentComics = data.rmtj1.data.concat(data.rmtj2.data);

    refineComic(newComics);
    refineComic(recommentComics);
    return { new: newComics, recommand: recommentComics };
  } catch (error) {
    logError(error);
  }
  return { new: [], recommand: [] };
};

export const getIndexData = async (): Promise<IndexComicData> => {
  try {
    const homeComic = await getHomeComic();
    const updatedComic = await getUpdatedComic();
    const mostViewComic = await getMostViewComic();
    const mostFollowComic = await getMostFollowComic();
    const mostViewOverComic = await getMostViewOverComic();
    const mostSearchComic = await getMostSerchComic();

    return {
      new: homeComic.new,
      update: updatedComic,
      mostView: mostViewComic,
      mostFollow: mostFollowComic,
      mostViewOver: mostViewOverComic,
      recommend: homeComic.recommand,
      mostSearch: mostSearchComic,
    };
  } catch (error) {
    logError(error);
  }
  return {
    new: [],
    update: [],
    mostView: [],
    mostFollow: [],
    mostViewOver: [],
    recommend: [],
    mostSearch: [],
  };
};

export const getComicChapterNum = async (id: string) => {
  try {
    const res = await axios.get(`/chapter_list/tp/${id}-1-1-1`);
    return Number(res.data.result.totalRow);
  } catch (error) {
    logError(error);
  }
  return 0;
};

export const getComicAllChapter = async (id: number): Promise<ComicChapter[]> => {
  try {
    const res = await axios.get(`/chapter_list/tp/${id}-1-1-1000`);
    const chapters = res.data.result.list;
    refineChapter(chapters);
    return chapters;
  } catch (error) {
    logError(error);
  }
  return [];
};

export const getAllComic = async (): Promise<Comic[]> =>
  await _post("/getbook.html", {
    order: "id",
  });

const refineComic = (comics: any) => {
  // 若 comics 为数组
  if (Array.isArray(comics)) {
    comics.forEach((comic) => {
      comic.author = comic.auther;
      comic.score = comic.pingfen ?? 9.9;
      comic.follow = comic.mark;
      comic.image = `${imageBaseURL}${comic.image}`;
      comic.cover = `${imageBaseURL}${comic.cover}`;
      comic.updateTime = comic.update_time;
      comic.isOver = comic.mhstatus;
      // delete comic.auther;
      // delete comic.pingfen;
      // delete comic.mark;
      // delete comic.update_time;
      // delete comic.mhstatus;
    });
  } else {
    for (const key in comics) {
      refineComic(comics[key]);
    }
  }
};

const refineChapter = (chapters: any) => {
  if (Array.isArray(chapters)) {
    chapters.forEach((chapter) => {
      chapter.title = (chapter.title as string).trim();
      chapter.createTime = formatTimeToDate(chapter.create_time as string);
      chapter.imageList = (chapter.imagelist as string).split(",").filter((url) => url.length > 0);
      // delete chapter.create_time;
      // delete chapter.imagelist;
    });
  }
};

const logError = (e: any) => {
  console.error("Error fetching newcomics: ", e.toJSON());
};
