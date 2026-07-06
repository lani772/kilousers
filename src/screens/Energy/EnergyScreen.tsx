import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ScreenLayout } from "../../components/organisms/ScreenLayout";
import { Text } from "../../components/atoms/Text";
import { Card } from "../../components/atoms/Card";
import { StatCard } from "../../components/molecules/StatCard";
import { theme } from "../../theme";

export const EnergyScreen = () => {
  const [period, setPeriod] = useState("Daily");

  return (
    <ScreenLayout>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="display" size="3xl" weight="700">Energy Analytics</Text>
        </View>

        <View style={styles.statGrid}>
          <StatCard
            label="Today"
            value="3.1 kWh"
            subValue="$0.37"
            color={theme.colors.dark.gold}
            icon={<Text>⚡</Text>}
          />
          <View style={styles.spacer} />
          <StatCard
            label="Month"
            value="63 kWh"
            subValue="$7.53"
            color={theme.colors.dark.accentLight}
            icon={<Text>📅</Text>}
          />
        </View>

        <View style={styles.periodTabs}>
          {["Daily", "Weekly", "Monthly"].map(p => (
            <TouchableOpacity
              key={p}
              onPress={() => setPeriod(p)}
              style={[styles.periodTab, period === p && styles.activePeriodTab]}
            >
              <Text
                weight="700"
                size="xs"
                color={period === p ? theme.colors.dark.text : theme.colors.dark.muted}
              >
                {p.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Card style={styles.chartCard}>
          <Text variant="body" weight="700" size="xs" color={theme.colors.dark.muted} style={styles.chartLabel}>
            CONSUMPTION TREND (kWh)
          </Text>
          <View style={styles.placeholderChart}>
            <Text color={theme.colors.dark.muted}>High-performance chart component</Text>
            <Text color={theme.colors.dark.muted} size="xs">(Victory Native / Wagmi Charts integration)</Text>
          </View>
        </Card>

        <View style={styles.sectionHeader}>
          <Text variant="body" weight="700" size="xs" color={theme.colors.dark.muted} style={styles.sectionLabel}>
            USAGE BY ROOM
          </Text>
        </View>
        {[
          { room: "Living Room", kwh: 14.2, color: theme.colors.dark.purple },
          { room: "Kitchen", kwh: 11.4, color: theme.colors.dark.gold },
          { room: "Bedroom", kwh: 8.1, color: theme.colors.dark.success },
        ].map(item => (
          <Card key={item.room} style={styles.roomCard}>
            <View style={styles.roomRow}>
              <Text weight="600">{item.room}</Text>
              <Text weight="700" color={item.color}>{item.kwh} kWh</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${(item.kwh/20)*100}%`, backgroundColor: item.color }]} />
            </View>
          </Card>
        ))}
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
  statGrid: {
    flexDirection: "row",
    marginBottom: 24,
  },
  spacer: {
    width: 12,
  },
  periodTabs: {
    flexDirection: "row",
    backgroundColor: theme.colors.dark.elevated,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  activePeriodTab: {
    backgroundColor: theme.colors.dark.card2,
    borderWidth: 1,
    borderColor: theme.colors.dark.border0,
  },
  chartCard: {
    padding: 20,
    marginBottom: 24,
    minHeight: 200,
  },
  chartLabel: {
    letterSpacing: 1,
    marginBottom: 16,
  },
  placeholderChart: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 140,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.colors.dark.border0,
    borderRadius: 12,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionLabel: {
    letterSpacing: 1,
  },
  roomCard: {
    marginBottom: 10,
    padding: 14,
  },
  roomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressTrack: {
    height: 4,
    backgroundColor: theme.colors.dark.elevated,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
  },
});
