import { Theme, DefaultTheme as RNTheme } from "@react-navigation/native";

export const tintColorLight = "#0a7ea4";
export const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "rgb(28, 28, 30)",
    background: "rgb(242, 242, 242)",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    tagBackground: "rgba(10, 126, 164, 0.1)",
  },
  dark: {
    text: "rgb(229, 229, 231)",
    background: "rgb(1, 1, 1)",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    tagBackground: "rgb(44, 44, 46)",
  },
};

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: tintColorLight,
    background: "rgb(1, 1, 1)",
    card: "rgb(18, 18, 18)",
    text: "rgb(229, 229, 231)",
    border: "rgb(39, 39, 41)",
    notification: "rgb(255, 69, 58)",
  },
  fonts: RNTheme.fonts,
};

export const DefaultTheme: Theme = {
  dark: false,
  colors: {
    primary: tintColorLight,
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(216, 216, 216)",
    notification: "rgb(255, 59, 48)",
  },
  fonts: RNTheme.fonts,
};
