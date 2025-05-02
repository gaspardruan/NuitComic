import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { memo } from "react";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "tag"
    | "mediumTitle"
    | "medium"
    | "emphasis"
    | "defaultLight"
    | "small"
    | "bold";
};

const ThemedText = ({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) => {
  const color = useThemeColor("text", {
    light: lightColor,
    dark: darkColor,
  });

  console.log("ThemedText rendered with type:", type);

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "tag" ? styles.tag : undefined,
        type === "mediumTitle" ? styles.mediumTitle : undefined,
        type === "medium" ? styles.medium : undefined,
        type === "emphasis" ? styles.emphasis : undefined,
        type === "defaultLight" ? styles.defaultLight : undefined,
        type === "small" ? styles.small : undefined,
        type === "bold" ? styles.bold : undefined,
        style,
      ]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  emphasis: {
    fontSize: 16,
    lineHeight: 24,
    color: "#0a7ea4",
  },
  defaultLight: {
    fontSize: 16,
    lineHeight: 24,
    color: "#fff",
  },
  medium: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "500",
  },
  defaultSemiBold: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  mediumTitle: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
  tag: {
    fontSize: 12,
    opacity: 0.7,
    lineHeight: 16,
  },
  small: {
    fontSize: 12,
    lineHeight: 16,
  },
  bold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
  },
});

export default memo(ThemedText);
