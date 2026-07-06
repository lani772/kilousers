import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ScreenLayout } from "../../components/organisms/ScreenLayout";
import { Text } from "../../components/atoms/Text";
import { Card } from "../../components/atoms/Card";
import { Toggle } from "../../components/atoms/Toggle";
import { theme } from "../../theme";
import { Lamp } from "../../components/organisms/LampCard";

const TABS = ["Overview", "Timers", "Schedule", "Specs"];

export const LampDetailScreen = ({ route, navigation }: any) => {
  const { lamp: initialLamp } = route.params;
  const [lamp, setLamp] = useState<Lamp>(initialLamp);
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <ScreenLayout withPadding={false}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text size="lg">←</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text variant="display" size="xl" weight="700">{lamp.name}</Text>
          <Text size="xs" color={theme.colors.dark.muted}>{lamp.room} · {lamp.floor}</Text>
        </View>
        <Toggle isOn={lamp.on} onToggle={(val) => setLamp({...lamp, on: val})} disabled={!lamp.online} />
      </View>

      <View style={styles.tabBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
            >
              <Text
                weight="700"
                size="sm"
                color={activeTab === tab ? theme.colors.dark.accentLight : theme.colors.dark.muted}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === "Overview" && (
          <View>
            <Card style={styles.mainCard}>
              <View style={styles.mainInfo}>
                <View style={[styles.largeIcon, { backgroundColor: lamp.on ? `${lamp.rgb}30` : theme.colors.dark.elevated }]}>
                  <Text size="4xl">💡</Text>
                </View>
                <View>
                  <Text variant="display" size="4xl" weight="700" color={lamp.on ? theme.colors.dark.success : theme.colors.dark.error}>
                    {lamp.on ? "ON" : "OFF"}
                  </Text>
                  {lamp.on && (
                    <Text size="sm" color={theme.colors.dark.secondary}>
                      Brightness {lamp.brightness}% · {lamp.colorTemp}K
                    </Text>
                  )}
                </View>
              </View>
            </Card>

            <View style={styles.statGrid}>
              <View style={styles.statBox}>
                <Text size="xl" weight="700" color={theme.colors.dark.accentLight}>{lamp.power}W</Text>
                <Text size="xs" color={theme.colors.dark.muted}>POWER</Text>
              </View>
              <View style={styles.statBox}>
                <Text size="xl" weight="700" color={theme.colors.dark.teal}>230V</Text>
                <Text size="xs" color={theme.colors.dark.muted}>VOLTAGE</Text>
              </View>
              <View style={styles.statBox}>
                <Text size="xl" weight="700" color={theme.colors.dark.gold}>0.8kWh</Text>
                <Text size="xs" color={theme.colors.dark.muted}>TODAY</Text>
              </View>
            </View>
          </View>
        )}

        {/* Other tabs would be implemented similarly */}
        {activeTab !== "Overview" && (
          <View style={styles.placeholder}>
            <Text color={theme.colors.dark.muted}>Tab {activeTab} coming soon...</Text>
          </View>
        )}
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.dark.border0,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    marginLeft: 8,
  },
  tabBar: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.dark.border0,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: theme.colors.dark.accentLight,
  },
  content: {
    padding: 16,
  },
  mainCard: {
    padding: 24,
    marginBottom: 16,
  },
  mainInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  largeIcon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  statGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    flex: 1,
    backgroundColor: theme.colors.dark.elevated,
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },
  placeholder: {
    alignItems: "center",
    padding: 40,
  },
});
