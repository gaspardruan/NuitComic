import { ComicChapter, ShowImage } from "./interface";

export const formatSliceKeyword = (keyword: string) => {
  if (!keyword) return "";
  return keyword.split(",").slice(0, 2).join(" ");
};

export const formatKeyword = (keyword: string): string[] => {
  if (!keyword) return [];
  return keyword.split(",").map((k) => k.trim());
};

export const formatNumber = (num: string | number): string => {
  const n = Number(num);
  if (n > 10000) {
    // 1.2万
    return (n / 10000).toFixed(1) + "万";
  }
  return n.toString();
};

export const formatTime = (time: string): string => {
  const t = new Date(time).getTime();
  const now = Date.now();
  const diff = now - t;
  if (diff < 1000 * 60 * 60 * 24) {
    return Math.floor(diff / (1000 * 60 * 60)) + "小时前更新";
  }
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + "天前更新";
};

export const formatTimeToDate = (time: string): string => {
  // 2023-3-3 12:00:00 -> 2023年03月03日
  const date = new Date(time);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}年${month}月${day}日`;
};

export const imageBaseURL = "https://icny.tengxun.click/public";

export const getAbsoluteImageURLs = (relateiveURLs: string[]): string[] => {
  return relateiveURLs.map((url) => {
    return `${imageBaseURL}${url}`;
  });
};

export const getShowImages = (
  chapters: ComicChapter[],
  chapterIndex: number
): ShowImage[] => {
  if (chapterIndex < 0 || chapterIndex >= chapters.length) {
    return [];
  }
  return chapters[chapterIndex].imageList.map((url, index) => ({
    key: url,
    url: `${imageBaseURL}${url}`,
    indexInChapter: index,
    chapterIndex,
  }));
};

const maxTitleLen = 12;
export const shortTitle = (title: string) => {
  let newTitle = title;
  if (title.length > maxTitleLen) {
    newTitle = title.substring(0, maxTitleLen) + "...";
  }
  return newTitle;
};
