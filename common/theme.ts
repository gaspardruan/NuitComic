import { Theme } from "@react-navigation/native";
import { fonts } from "@react-navigation/native/src/theming/fonts";

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
    tagBackground: "#F3F4F4",
  },
  dark: {
    text: "rgb(229, 229, 231)",
    background: "rgb(1, 1, 1)",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    tagBackground: "#2D2D2D",
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
  fonts,
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
  fonts,
};
