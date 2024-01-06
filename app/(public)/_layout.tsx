import React from "react";
import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#43766C",
        },
        headerTintColor: "#F8FAE5",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen 
        name="login" 
        options={{ headerTitle: "Clerk Auth App" }} 
      />
      <Stack.Screen
        name="register"
        options={{ headerTitle: "Create Account" }}
      />
      <Stack.Screen 
        name="reset" 
        options={{ headerTitle: "Reset Password" }} 
      />
    </Stack>
  );
};

export default PublicLayout;
