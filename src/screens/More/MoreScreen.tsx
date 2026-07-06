import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ScreenLayout } from "../../components/organisms/ScreenLayout";
import { Text } from "../../components/atoms/Text";
import { Card } from "../../components/atoms/Card";
import { theme } from "../../theme";
import { useAppStore } from "../../store/useAppStore";
import {
  Radio,
  Heart,
  Clapperboard,
  Layout,
  Bell,
  ClipboardList,
  Settings
} from "lucide-react-native";

const MODULES = [
  { id: "mqtt", label: "MQTT Monitor", icon: Radio, desc: "Broker, topics & device states" },
  { id: "health", label: "Device Health", icon: Heart, desc: "RSSI, CPU, memory & uptime" },
  { id: "scenes", label: "Scenes", icon: Clapperboard, desc: "Lighting presets & custom" },
  { id: "rooms", label: "Rooms", icon: Layout, desc: "Multi-room dashboard" },
  { id: "notifs", label: "Notifications", icon: Bell, desc: "Alerts & history" },
  { id: "activity", label: "Activity Log", icon: ClipboardList, desc: "Full audit trail" },
  { id: "settings", label: "Settings", icon: Settings, desc: "Profile & preferences" },
];

export const MoreScreen = ({ navigation }: any) => {
  const { theme: appTheme } = useAppStore();
  const colors = appTheme === "dark" || appTheme === "system" ? theme.colors.dark : theme.colors.light;

  return (
    <ScreenLayout>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="display" size="3xl" weight="700">All Modules</Text>
          <Text size="base" color={colors.muted} style={styles.subtitle}>
            Navigate to advanced features and system tools.
          </Text>
        </View>

        <View style={styles.grid}>
          {MODULES.map((module) => (
            <TouchableOpacity key={module.id} activeOpacity={0.7} style={styles.gridItem}>
              <Card style={styles.moduleCard}>
                <View style={styles.iconWrapper}>
                  <module.icon size={28} color={colors.accentLight} />
                </View>
                <Text weight="700" size="base">{module.label}</Text>
                <Text size="xs" color={colors.muted} style={styles.moduleDesc}>
                  {module.desc}
                </Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingVertical: 16,
  },
  header: {
    marginBottom: 24,
  },
  subtitle: {
    marginTop: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    marginBottom: 16,
  },
  moduleCard: {
    padding: 16,
    height: 160,
  },
  iconWrapper: {
    marginBottom: 16,
  },
  moduleDesc: {
    marginTop: 4,
    lineHeight: 16,
  },
});
