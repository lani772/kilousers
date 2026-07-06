import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform, Image } from "react-native";
import { Text } from "../../components/atoms/Text";
import { Button } from "../../components/atoms/Button";
import { Card } from "../../components/atoms/Card";
import { ScreenLayout } from "../../components/organisms/ScreenLayout";
import { theme } from "../../theme";
import { useAuthStore } from "../../store/useAuthStore";

export const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      login(
        {
          id: "1",
          name: "Alex Harrison",
          email: "alex@smarthome.io",
          role: "Admin",
          initials: "AH",
          color: theme.colors.dark.accent,
        },
        "mock-token"
      );
      setLoading(false);
    }, 1500);
  };

  return (
    <ScreenLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text variant="display" size="5xl" color={theme.colors.dark.text} weight="700">
            LUMA
          </Text>
          <Text variant="body" size="sm" color={theme.colors.dark.gold} weight="700" style={styles.subtitle}>
            SMART HOME
          </Text>
        </View>

        <Card variant="elevated" style={styles.formCard}>
          <Text variant="display" size="2xl" weight="700" style={styles.welcome}>
            Welcome Back
          </Text>
          <Text variant="body" size="sm" color={theme.colors.dark.muted} style={styles.instruction}>
            Authenticate to manage your ecosystem.
          </Text>

          <Button
            label="Sign In with Biometrics"
            onPress={handleLogin}
            loading={loading}
            style={styles.button}
          />

          <Button
            label="Use Password"
            variant="outline"
            onPress={() => {}}
            style={styles.button}
          />
        </Card>

        <View style={styles.footer}>
          <Text variant="body" size="xs" color={theme.colors.dark.muted}>
            Version 3.2.0 · Built with Rust & React Native
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  subtitle: {
    letterSpacing: 4,
    marginTop: 4,
  },
  formCard: {
    padding: 24,
  },
  welcome: {
    marginBottom: 8,
  },
  instruction: {
    marginBottom: 32,
  },
  button: {
    marginBottom: 16,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
});
