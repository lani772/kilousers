import React from "react";
import { Text as RNText, TextProps, StyleSheet } from "react-native";
import { theme } from "../../theme";
import { useAppStore } from "../../store/useAppStore";
import { styled } from "nativewind";

const StyledText = styled(RNText);

interface LumaTextProps extends TextProps {
  variant?: "display" | "body" | "mono";
  size?: keyof typeof theme.typography.sizes;
  color?: string;
  weight?: "normal" | "bold" | "600" | "700" | "800";
  className?: string;
}

export const Text: React.FC<LumaTextProps> = ({
  children,
  variant = "body",
  size = "base",
  color,
  weight,
  style,
  className,
  ...props
}) => {
  const { theme: appTheme } = useAppStore();
  const isDark = appTheme === "dark" || appTheme === "system";
  const currentColors = isDark ? theme.colors.dark : theme.colors.light;

  const textStyle = [
    {
      fontFamily: theme.typography.fonts[variant],
      fontSize: theme.typography.sizes[size],
      color: color || currentColors.text,
      fontWeight: weight as any,
    },
    style,
  ];

  return (
    <StyledText className={className} style={textStyle} {...props}>
      {children}
    </StyledText>
  );
};
