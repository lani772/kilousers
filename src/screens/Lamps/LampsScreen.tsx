import React, { useState } from "react";
import { FlatList, StyleSheet, View, TextInput } from "react-native";
import { ScreenLayout } from "../../components/organisms/ScreenLayout";
import { LampCard, Lamp } from "../../components/organisms/LampCard";
import { Text } from "../../components/atoms/Text";
import { theme } from "../../theme";

const MOCK_LAMPS: Lamp[] = [
  { id: "1", name: "Living Room Main", room: "Living Room", floor: "Ground Floor", on: true, brightness: 80, colorTemp: 3000, rgb: "#FFB77A", online: true, power: 9 },
  { id: "2", name: "Bedroom Ceiling", room: "Bedroom", floor: "First Floor", on: false, brightness: 50, colorTemp: 4000, rgb: "#ADE8F4", online: true, power: 0 },
  { id: "3", name: "Kitchen Downlight", room: "Kitchen", floor: "Ground Floor", on: true, brightness: 60, colorTemp: 5000, rgb: "#F5F5E8", online: true, power: 6 },
  { id: "4", name: "Front Porch", room: "Entrance", floor: "Ground Floor", on: false, brightness: 100, colorTemp: 2700, rgb: "#FFD166", online: false, power: 0 },
];

export const LampsScreen = ({ navigation }: any) => {
  const [lamps, setLamps] = useState(MOCK_LAMPS);
  const [search, setSearch] = useState("");

  const toggleLamp = (id: string, value: boolean) => {
    setLamps(prev => prev.map(l => l.id === id ? { ...l, on: value, power: value ? 10 : 0 } : l));
  };

  const filteredLamps = lamps.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.room.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScreenLayout>
      <View style={styles.header}>
        <Text variant="display" size="3xl" weight="700">Lamps</Text>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search lamps..."
            placeholderTextColor={theme.colors.dark.muted}
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <FlatList
        data={filteredLamps}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <LampCard
            lamp={item}
            onToggle={toggleLamp}
            onPress={(l) => navigation.navigate("LampDetail", { lamp: l })}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 16,
  },
  searchContainer: {
    marginTop: 16,
    backgroundColor: theme.colors.dark.elevated,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    justifyContent: "center",
  },
  searchInput: {
    color: theme.colors.dark.text,
    fontFamily: theme.typography.fonts.body,
    fontSize: 14,
  },
  list: {
    paddingBottom: 100,
  },
});
