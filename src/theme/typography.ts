import { Platform } from "react-native";

export const typography = {
  fonts: {
    // Fallbacks to system fonts if specific ones aren't loaded
    display: Platform.select({
      ios: "CormorantGaramond-Bold",
      android: "CormorantGaramond-Bold",
      default: "serif",
    }),
    body: Platform.select({
      ios: "Rajdhani-Medium",
      android: "Rajdhani-Medium",
      default: "sans-serif",
    }),
    mono: Platform.select({
      ios: "JetBrainsMono-Regular",
      android: "JetBrainsMono-Regular",
      default: "monospace",
    }),
  },
  sizes: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    "2xl": 20,
    "3xl": 24,
    "4xl": 30,
    "5xl": 34,
  },
};
