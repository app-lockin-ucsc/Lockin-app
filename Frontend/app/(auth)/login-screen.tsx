import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = FIREBASE_AUTH;

  const handleSignin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        router.push("/(tabs)");
      });
    } catch (error) {
      Alert.alert("Login Error: " + error);
    }
  };

  const navigateToHome = () => {
    router.push("/(tabs)");
  };

  const handleCreateAccount = () => {
    router.push("/(auth)/signup-screen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={navigateToHome}>
        <Text style={styles.textStyle}>Go back</Text>
      </TouchableOpacity>
      <Text>Login</Text>
      <TextInput
        style={styles.textStyle}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.textStyle}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleSignin} />
      <Button title="Create an account" onPress={handleCreateAccount}></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1, // Take up the full screen height
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  textStyle: {
    fontSize: 25,
    color: "white",
    width: "100%",
  },
});
