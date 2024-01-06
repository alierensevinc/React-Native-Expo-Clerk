import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useUser } from "@clerk/clerk-expo";

const Home = () => {
  const { user } = useUser();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAE5' }}>
			<Text style={{color: '#76453B'}}>Welcome, {user?.emailAddresses[0].emailAddress} 🎉</Text>
		</View>
  );
};

export default Home;
