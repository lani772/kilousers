import { create } from "zustand";
import { Appearance } from "react-native";

interface AppState {
  theme: "light" | "dark" | "system";
  isMqttConnected: boolean;
  setTheme: (theme: "light" | "dark" | "system") => void;
  setMqttStatus: (status: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: "system",
  isMqttConnected: false,
  setTheme: (theme) => set({ theme }),
  setMqttStatus: (isMqttConnected) => set({ isMqttConnected }),
}));
