import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../atoms/Text";
import { Card } from "../atoms/Card";
import { Toggle } from "../atoms/Toggle";
import { theme } from "../../theme";
import { useAppStore } from "../../store/useAppStore";
import { Lightbulb, Wifi, WifiOff, Zap } from "lucide-react-native";
import Animated, { FadeInRight } from "react-native-reanimated";

export interface Lamp {
  id: string;
  name: string;
  room: string;
  floor: string;
  on: boolean;
  brightness: number;
  colorTemp: number;
  rgb: string;
  online: boolean;
  power: number;
}

interface LampCardProps {
  lamp: Lamp;
  onToggle: (id: string, value: boolean) => void;
  onPress: (lamp: Lamp) => void;
  index?: number;
}

export const LampCard: React.FC<LampCardProps> = ({ lamp, onToggle, onPress, index = 0 }) => {
  const { theme: appTheme } = useAppStore();
  const colors = appTheme === "dark" || appTheme === "system" ? theme.colors.dark : theme.colors.light;

  const borderColor = lamp.online ? (lamp.on ? `${lamp.rgb}60` : colors.border0) : `${colors.error}40`;

  return (
    <Animated.View entering={FadeInRight.delay(index * 100)}>
      <TouchableOpacity activeOpacity={0.9} onPress={() => onPress(lamp)}>
        <Card style={[styles.card, { borderColor }]}>
          <View style={styles.row}>
            <View style={[styles.iconContainer, { backgroundColor: lamp.on ? `${lamp.rgb}20` : colors.elevated }]}>
              <Lightbulb size={24} color={lamp.on ? lamp.rgb : colors.muted} fill={lamp.on ? lamp.rgb : "none"} />
            </View>
            <View style={styles.info}>
              <Text variant="display" size="lg" weight="700">{lamp.name}</Text>
              <Text size="xs" color={colors.muted}>{lamp.room} · {lamp.floor}</Text>
            </View>
            <Toggle isOn={lamp.on} onToggle={(val) => onToggle(lamp.id, val)} disabled={!lamp.online} />
          </View>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <View style={styles.statusRow}>
                {lamp.online ? <Wifi size={10} color={colors.success} /> : <WifiOff size={10} color={colors.error} />}
                <Text size="xs" weight="700" color={lamp.online ? colors.success : colors.error} style={styles.statusText}>
                  {lamp.online ? "ONLINE" : "OFFLINE"}
                </Text>
              </View>
            </View>
            {lamp.on && (
              <View style={styles.statItem}>
                <View style={styles.statusRow}>
                  <Zap size={10} color={colors.muted} />
                  <Text size="xs" color={colors.muted} style={styles.statusText}>{lamp.power}W</Text>
                </View>
              </View>
            )}
            <View style={styles.statItem}>
              <Text size="xs" color={colors.muted}>☀ {lamp.brightness}%</Text>
            </View>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${lamp.brightness}%`, backgroundColor: lamp.on ? lamp.rgb : colors.muted }]} />
          </View>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  stats: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 8,
  },
  statItem: {
    marginRight: 12,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: theme.colors.dark.elevated,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
  },
});
