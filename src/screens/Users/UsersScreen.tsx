import React from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { ScreenLayout } from "../../components/organisms/ScreenLayout";
import { Text } from "../../components/atoms/Text";
import { Card } from "../../components/atoms/Card";
import { Button } from "../../components/atoms/Button";
import { theme } from "../../theme";
import { useAppStore } from "../../store/useAppStore";
import { UserPlus, MoreHorizontal, ShieldCheck } from "lucide-react-native";

const MOCK_USERS = [
  { id: "1", name: "Alex Harrison", email: "alex@smarthome.io", role: "Admin", initials: "AH", color: theme.colors.dark.accent, status: "active" },
  { id: "2", name: "Elena Rodriguez", email: "elena@smarthome.io", role: "Manager", initials: "ER", color: theme.colors.dark.success, status: "active" },
  { id: "3", name: "Marcus Chen", email: "marcus@smarthome.io", role: "Operator", initials: "MC", color: theme.colors.dark.purple, status: "active" },
  { id: "4", name: "Sofia Williams", email: "sofia@clean.io", role: "Viewer", initials: "SW", color: theme.colors.dark.gold, status: "active" },
];

export const UsersScreen = () => {
  const { theme: appTheme } = useAppStore();
  const colors = appTheme === "dark" || appTheme === "system" ? theme.colors.dark : theme.colors.light;

  return (
    <ScreenLayout>
      <View style={styles.header}>
        <View>
          <Text variant="display" size="3xl" weight="700">Users</Text>
          <Text size="xs" color={colors.muted} style={styles.subtitle}>
            {MOCK_USERS.length} active members
          </Text>
        </View>
        <Button
          label="Add"
          size="sm"
          style={styles.addButton}
          leftIcon={<UserPlus size={14} color="#FFF" />}
        />
      </View>

      <FlatList
        data={MOCK_USERS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card style={styles.userCard}>
            <View style={styles.userRow}>
              <View style={[styles.avatar, { backgroundColor: `${item.color}14`, borderColor: `${item.color}35` }]}>
                <Text weight="700" color={item.color}>{item.initials}</Text>
              </View>
              <View style={styles.userInfo}>
                <View style={styles.nameRow}>
                  <Text weight="700" size="base">{item.name}</Text>
                  <View style={[styles.roleBadge, { backgroundColor: `${item.color}14`, borderColor: `${item.color}35` }]}>
                    <Text size="xs" weight="700" color={item.color}>{item.role.toUpperCase()}</Text>
                  </View>
                </View>
                <Text size="xs" color={colors.muted}>{item.email}</Text>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <MoreHorizontal size={20} color={colors.muted} />
              </TouchableOpacity>
            </View>
          </Card>
        )}
        contentContainerStyle={styles.list}
      />

      <Card variant="elevated" style={styles.roleMatrixCard}>
        <View style={styles.matrixHeader}>
          <ShieldCheck size={18} color={colors.accentLight} />
          <Text variant="body" weight="700" size="xs" color={colors.muted} style={styles.sectionLabel}>
            ROLE PERMISSIONS
          </Text>
        </View>
        <Text size="sm" color={colors.muted} style={styles.matrixDesc}>
          Review and manage access levels across your ecosystem.
        </Text>
        <Button label="View Permission Matrix" variant="outline" onPress={() => {}} />
      </Card>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 8,
  },
  subtitle: {
    marginTop: 2,
  },
  addButton: {
    paddingVertical: 8,
  },
  list: {
    paddingBottom: 24,
  },
  userCard: {
    marginBottom: 12,
    padding: 14,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  roleBadge: {
    marginLeft: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  moreButton: {
    padding: 8,
  },
  roleMatrixCard: {
    marginTop: "auto",
    marginBottom: 100,
    padding: 16,
  },
  matrixHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionLabel: {
    letterSpacing: 1,
    marginLeft: 8,
  },
  matrixDesc: {
    marginBottom: 16,
  },
});
