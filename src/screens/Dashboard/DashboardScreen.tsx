import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "../../components/atoms/Text";
import { Card } from "../../components/atoms/Card";
import { StatCard } from "../../components/molecules/StatCard";
import { ScreenLayout } from "../../components/organisms/ScreenLayout";
import { theme } from "../../theme";
import { useAuthStore } from "../../store/useAuthStore";
import { useAppStore } from "../../store/useAppStore";
import { Lightbulb, Zap, Wifi, Sun, Shield, Clapperboard, Moon, Activity as ActivityIcon } from "lucide-react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

const QUICK_SCENES = [
  { id: "morning", label: "Morning", icon: Sun, color: theme.colors.dark.gold },
  { id: "away", label: "Away", icon: Shield, color: theme.colors.dark.rose },
  { id: "movie", label: "Movie", icon: Clapperboard, color: theme.colors.dark.purple },
  { id: "sleep", label: "Sleep", icon: Moon, color: "#4F46E5" },
];

const RECENT_ACTIVITY = [
  { id: 1, action: "Turned ON Living Room Main", user: "Alex Harrison", time: "2m ago", icon: Lightbulb },
  { id: 2, action: "Morning Routine executed", user: "System", time: "1h ago", icon: Sun },
  { id: 3, action: "Brightness 60% · Kitchen", user: "Elena Rodriguez", time: "2h ago", icon: Lightbulb },
];

export const DashboardScreen = () => {
  const user = useAuthStore((state) => state.user);
  const { theme: appTheme } = useAppStore();
  const colors = appTheme === "dark" || appTheme === "system" ? theme.colors.dark : theme.colors.light;

  return (
    <ScreenLayout>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeInUp.delay(100)} style={styles.header}>
          <Text color={colors.secondary} size="sm" weight="600">
            WEDNESDAY, JUNE 3
          </Text>
          <Text variant="display" size="4xl" weight="700">
            Good Evening, {user?.name?.split(" ")[0]}
          </Text>
          <Text color={colors.muted} size="sm" style={styles.summary}>
            3 active · 5/6 online · 27 W live
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200)} style={styles.statGrid}>
          <StatCard
            label="Active"
            value={3}
            subValue="lamps on"
            color={colors.success}
            icon={<Lightbulb size={16} color={colors.success} />}
          />
          <View style={styles.spacer} />
          <StatCard
            label="Power"
            value="27 W"
            subValue="live draw"
            color={colors.gold}
            icon={<Zap size={16} color={colors.gold} />}
          />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(300)}>
          <View style={styles.sectionHeader}>
            <Text variant="body" weight="700" size="xs" color={colors.muted} style={styles.sectionLabel}>
              QUICK SCENES
            </Text>
          </View>
          <View style={styles.sceneGrid}>
            {QUICK_SCENES.map((scene) => (
              <TouchableOpacity key={scene.id} activeOpacity={0.7} style={styles.sceneItem}>
                <Card style={styles.sceneCard}>
                  <scene.icon size={24} color={scene.color} />
                  <Text weight="700" size="xs" color={colors.muted} style={styles.sceneLabel}>
                    {scene.label}
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400)}>
          <View style={styles.sectionHeader}>
            <Text variant="body" weight="700" size="xs" color={colors.muted} style={styles.sectionLabel}>
              RECENT ACTIVITY
            </Text>
          </View>
          {RECENT_ACTIVITY.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <activity.icon size={18} color={colors.accentLight} />
              </View>
              <View style={styles.activityContent}>
                <Text weight="600" size="base">{activity.action}</Text>
                <Text size="xs" color={colors.muted}>{activity.user}</Text>
              </View>
              <Text size="xs" color={colors.muted}>{activity.time}</Text>
            </View>
          ))}
        </Animated.View>
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: 24,
  },
  header: {
    marginBottom: 24,
  },
  summary: {
    marginTop: 4,
  },
  statGrid: {
    flexDirection: "row",
    marginBottom: 24,
  },
  spacer: {
    width: 12,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionLabel: {
    letterSpacing: 1,
  },
  sceneGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  sceneItem: {
    flex: 1,
    marginHorizontal: 4,
  },
  sceneCard: {
    alignItems: "center",
    padding: 12,
  },
  sceneLabel: {
    marginTop: 8,
    letterSpacing: 0.5,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.dark.border0,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: theme.colors.dark.elevated,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
});
