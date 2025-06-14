export interface Comic {
  id: string;
  title: string;
  view: string;
  image: string; // vertical image
  cover: string; // horizontal image
  desc: string;
  author: string;
  score?: string;
  follow: string;
  keyword: string;
  updateTime: string;
  isOver: string; // "1" for over, "0" for ongoing
}

export interface IndexComicData {
  new: Comic[];
  update: Comic[];
  mostView: Comic[];
  mostFollow: Comic[];
  mostViewOver: Comic[];
  recommend: Comic[];
  mostSearch: Comic[];
}

export interface ComicChapter {
  id: string;
  title: string;
  createTime: string;
  imageList: string[];
}

export interface ShowImage {
  key: string;
  url: string;
  indexInChapter: number;
  chapterIndex: number;
}
