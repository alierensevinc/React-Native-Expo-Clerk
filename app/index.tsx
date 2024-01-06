import React from "react";
import { View, ActivityIndicator } from "react-native";

const StartPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#43766C" />
    </View>
  );
};

export default StartPage;
