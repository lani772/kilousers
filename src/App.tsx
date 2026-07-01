import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";
import { RootNavigator } from "./navigation/RootNavigator";
import { useAuthStore } from "./store/useAuthStore";
import { LoginScreen } from "./screens/Auth/LoginScreen";

const App = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {isAuthenticated ? <RootNavigator /> : <LoginScreen />}
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
