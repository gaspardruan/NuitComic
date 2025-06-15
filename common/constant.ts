import { Dimensions } from "react-native";

// (tabs)/home/index
export const YOffset = 24;

// comic/[id]/index
export const HorizontalGap = 20;
export const TopGap = 4;
export const SectionGap = 20;
export const TitleHeight = 24;

export const ReduntantBottomHeight = 100;

export const MaxRencentlyRead = 50;

const { width } = Dimensions.get("window");
export const ClientWidth = width;

export const ContentWidth = ClientWidth - HorizontalGap * 2;
