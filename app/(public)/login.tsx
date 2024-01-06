import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { Link } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";

const LoginPage = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    setLoading(true);

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <TextInput
        autoCapitalize="none"
        placeholder="mail@provider.com"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={styles.input}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="****"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button onPress={onSignInPress} title="Login" color={"#B19470"} />
      <Link href="/register" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/reset" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Forgot Password ?</Text>
        </TouchableOpacity>
      </Link>
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
  button: {
    marginTop: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#76453B",
  },
});

export default LoginPage;
