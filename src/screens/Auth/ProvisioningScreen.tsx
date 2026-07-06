import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "../../components/atoms/Text";
import { Button } from "../../components/atoms/Button";
import { Card } from "../../components/atoms/Card";
import { ScreenLayout } from "../../components/organisms/ScreenLayout";
import { theme } from "../../theme";

export const ProvisioningScreen = () => {
  return (
    <ScreenLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text variant="display" size="3xl" weight="700">Add New Device</Text>
          <Text variant="body" size="base" color={theme.colors.dark.muted} style={styles.subtitle}>
            Select a method to provision your LUMA hardware.
          </Text>
        </View>

        <Card style={styles.optionCard}>
          <View style={styles.iconPlaceholder}>
            <Text size="4xl">📷</Text>
          </View>
          <Text variant="display" size="xl" weight="700">Scan QR Code</Text>
          <Text variant="body" size="sm" color={theme.colors.dark.muted} style={styles.optionDesc}>
            Fastest method. Scan the code found on the device casing or packaging.
          </Text>
          <Button label="Open Camera" onPress={() => {}} style={styles.actionButton} />
        </Card>

        <Card style={styles.optionCard}>
          <View style={styles.iconPlaceholder}>
            <Text size="4xl">📡</Text>
          </View>
          <Text variant="display" size="xl" weight="700">Wi-Fi Provisioning</Text>
          <Text variant="body" size="sm" color={theme.colors.dark.muted} style={styles.optionDesc}>
            Connect directly to the device's hotspot to configure home network settings.
          </Text>
          <Button label="Search for Devices" variant="outline" onPress={() => {}} style={styles.actionButton} />
        </Card>

        <Card style={styles.optionCard}>
          <View style={styles.iconPlaceholder}>
            <Text size="4xl">🦷</Text>
          </View>
          <Text variant="display" size="xl" weight="700">Bluetooth Setup</Text>
          <Text variant="body" size="sm" color={theme.colors.dark.muted} style={styles.optionDesc}>
            Use BLE for seamless discovery and secure credential handoff.
          </Text>
          <Button label="Connect via BLE" variant="outline" onPress={() => {}} style={styles.actionButton} />
        </Card>
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  header: {
    marginBottom: 32,
  },
  subtitle: {
    marginTop: 8,
  },
  optionCard: {
    marginBottom: 20,
    alignItems: "center",
    padding: 24,
  },
  iconPlaceholder: {
    marginBottom: 16,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.dark.elevated,
    alignItems: "center",
    justifyContent: "center",
  },
  optionDesc: {
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  actionButton: {
    width: "100%",
  },
});
