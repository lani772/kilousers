import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../../theme";

interface ToggleProps {
  isOn: boolean;
  onToggle: (value: boolean) => void;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({ isOn, onToggle, disabled }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={() => onToggle(!isOn)}
      style={[
        styles.track,
        isOn ? styles.trackOn : styles.trackOff,
        disabled && styles.disabled,
      ]}
    >
      <View style={[styles.thumb, isOn ? styles.thumbOn : styles.thumbOff]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 3,
    justifyContent: "center",
  },
  trackOn: {
    backgroundColor: theme.colors.dark.accent,
  },
  trackOff: {
    backgroundColor: theme.colors.dark.elevated,
  },
  thumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  thumbOn: {
    alignSelf: "flex-end",
  },
  thumbOff: {
    alignSelf: "flex-start",
  },
  disabled: {
    opacity: 0.5,
  },
});
