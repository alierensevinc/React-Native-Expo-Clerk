import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";
import { Stack } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

const PwReset = () => {
  const { signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);

  // Request a passowrd reset code by email
  const onRequestReset = async () => {
    try {
      await signIn!.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      alert("Password reset successfully");

      // Set the user session active, which will log in the user automatically
      await setActive!({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

      {!successfulCreation && (
        <>
          <TextInput
            autoCapitalize="none"
            placeholder="mail@provider.com"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={styles.input}
          />

          <Button
            onPress={onRequestReset}
            title="Send Reset Email"
            color={"#B19470"}
          ></Button>
        </>
      )}

      {successfulCreation && (
        <>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              style={styles.input}
              onChangeText={setCode}
            />
            <TextInput
              placeholder="your_new_password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
          </View>
          <Button
            onPress={onReset}
            title="Set new Password"
            color={"#B19470"}
          ></Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F8FAE5",
  },
  input: {
    marginBottom: 8,
    height: 50,
    borderWidth: 1,
    borderColor: "#B19470",
    color: "#76453B",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});

export default PwReset;
