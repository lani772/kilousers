import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Placeholder screens
import { View } from "react-native";
import { Text } from "../components/atoms/Text";
import { theme } from "../theme";
import { DashboardScreen } from "../screens/Dashboard/DashboardScreen";
import { LampsScreen } from "../screens/Lamps/LampsScreen";
import { LampDetailScreen } from "../screens/Lamps/LampDetailScreen";
import { EnergyScreen } from "../screens/Energy/EnergyScreen";
import { UsersScreen } from "../screens/Users/UsersScreen";
import { MoreScreen } from "../screens/More/MoreScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Placeholder = ({ name }: { name: string }) => (
  <View style={{ flex: 1, backgroundColor: theme.colors.dark.background, alignItems: "center", justifyContent: "center" }}>
    <Text variant="display" size="2xl">{name}</Text>
  </View>
);

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.dark.backgroundLow,
          borderTopColor: theme.colors.dark.border0,
          paddingBottom: 20,
          height: 80,
        },
        tabBarActiveTintColor: theme.colors.dark.accentLight,
        tabBarInactiveTintColor: theme.colors.dark.muted,
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Lamps" component={LampsScreen} />
      <Tab.Screen name="Energy" component={EnergyScreen} />
      <Tab.Screen name="Users" component={UsersScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
};

import { ProvisioningScreen } from "../screens/Auth/ProvisioningScreen";

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={HomeTabs} />
      <Stack.Screen name="Provisioning" component={ProvisioningScreen} />
      <Stack.Screen name="LampDetail" component={LampDetailScreen} />
      {/* Detail screens will be added here */}
    </Stack.Navigator>
  );
};
