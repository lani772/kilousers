import React from "react";
import { TouchableOpacity, TouchableOpacityProps, View, StyleSheet } from "react-native";
import { Text } from "./Text";
import { theme } from "../../theme";
import { useAppStore } from "../../store/useAppStore";
import { styled } from "nativewind";

const StyledTouchableOpacity = styled(TouchableOpacity);

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: "primary" | "secondary" | "outline" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  size = "md",
  loading,
  leftIcon,
  style,
  className,
  ...props
}) => {
  const { theme: appTheme } = useAppStore();
  const isDark = appTheme === "dark" || appTheme === "system";
  const colors = isDark ? theme.colors.dark : theme.colors.light;

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return { backgroundColor: colors.accent };
      case "secondary":
        return { backgroundColor: colors.elevated };
      case "outline":
        return { backgroundColor: "transparent", borderWidth: 1, borderColor: colors.border0 };
      case "danger":
        return { backgroundColor: colors.error };
      case "success":
        return { backgroundColor: colors.success };
      default:
        return { backgroundColor: colors.accent };
    }
  };

  const textColor = variant === "outline" ? colors.accentLight : "#FFFFFF";

  return (
    <StyledTouchableOpacity
      activeOpacity={0.8}
      className={className}
      style={[styles.base, getVariantStyles(), style]}
      {...props}
    >
      <View style={styles.content}>
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
        <Text
          weight="700"
          color={textColor}
          size={size === "sm" ? "sm" : "base"}
        >
          {label}
        </Text>
      </View>
    </StyledTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
});
