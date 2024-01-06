import React from "react";
import { Pressable } from "react-native";
import { Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

export const LogoutButton = () => {
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={"#F8FAE5"} />
    </Pressable>
  );
};

const AuthLayout = () => {
  const { isSignedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#43766C",
        },
        headerTintColor: "#F8FAE5",
        tabBarStyle: {
          backgroundColor: "#EAECCC",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={focused ? "#76453B" : "#B19470"}
            />
          ),
          tabBarActiveTintColor: "#76453B",
          tabBarInactiveTintColor: "#B19470",
          tabBarLabel: "Home",
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "My Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="person-outline"
              size={size}
              color={focused ? "#76453B" : "#B19470"}
            />
          ),
          tabBarActiveTintColor: "#76453B",
          tabBarInactiveTintColor: "#B19470",
          tabBarLabel: "My Profile",
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
};

export default AuthLayout;
