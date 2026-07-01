import React from "react";
import { View, StyleSheet, SafeAreaView, Platform, StatusBar } from "react-native";
import { theme } from "../../theme";
import { useAppStore } from "../../store/useAppStore";

interface LayoutProps {
  children: React.ReactNode;
  withPadding?: boolean;
}

export const ScreenLayout: React.FC<LayoutProps> = ({ children, withPadding = true }) => {
  const { theme: appTheme } = useAppStore();
  const isDark = appTheme === "dark" || appTheme === "system"; // Simplified system check
  const currentColors = isDark ? theme.colors.dark : theme.colors.light;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentColors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View style={[styles.content, withPadding && styles.padding]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: 16,
  },
});
