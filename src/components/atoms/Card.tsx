import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { theme } from "../../theme";
import { useAppStore } from "../../store/useAppStore";
import { styled } from "nativewind";

const StyledView = styled(View);

interface CardProps extends ViewProps {
  variant?: "surface" | "elevated" | "card2";
  bordered?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "surface",
  bordered = true,
  style,
  className,
  ...props
}) => {
  const { theme: appTheme } = useAppStore();
  const isDark = appTheme === "dark" || appTheme === "system";
  const colors = isDark ? theme.colors.dark : theme.colors.light;

  return (
    <StyledView
      className={className}
      style={[
        styles.base,
        { backgroundColor: colors[variant] },
        bordered && { borderWidth: 1, borderColor: colors.border0 },
        style,
      ]}
      {...props}
    >
      {children}
    </StyledView>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 18,
    padding: 16,
  },
});
