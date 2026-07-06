import React from "react";
import { View, StyleSheet } from "react-native";
import { Card } from "../atoms/Card";
import { Text } from "../atoms/Text";
import { theme } from "../../theme";
import { useAppStore } from "../../store/useAppStore";

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  color: string;
  icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subValue,
  color,
  icon,
}) => {
  const { theme: appTheme } = useAppStore();
  const isDark = appTheme === "dark" || appTheme === "system";
  const colors = isDark ? theme.colors.dark : theme.colors.light;

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text variant="body" weight="700" size="xs" color={colors.muted} style={styles.label}>
          {label.toUpperCase()}
        </Text>
        <View style={[styles.iconContainer, { backgroundColor: `${color}14` }]}>
          {icon}
        </View>
      </View>
      <Text variant="display" weight="700" size="3xl" color={color}>
        {value}
      </Text>
      {subValue && (
        <Text variant="body" size="xs" color={colors.muted} style={styles.subValue}>
          {subValue}
        </Text>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    letterSpacing: 1,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  subValue: {
    marginTop: 4,
  },
});
