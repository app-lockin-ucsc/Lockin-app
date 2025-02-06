import React, { useState, useEffect } from "react";
import { Button, StyleSheet, TextInput, Text, Alert } from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firebase from "@react-native-firebase/app";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  function PhoneSignIn() {
    firebase.auth().settings.appVerificationDisabledForTesting = true;
    // If null, no SMS has been sent
    const [confirm, setConfirm] =
      useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    // Phone Number
    const [number, setNumber] = useState<string>("");
    // Verification code (OTP - One-Time-Passcode)
    const [code, setCode] = useState<string>("");

    // Handle (login)
    function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
      if (user) {
        setLoggedIn(true);
      }
    }

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);

    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber: string): Promise<void> {
      try {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
      } catch (error) {
        Alert.alert("Error", `You must enter a valid number. ${error}`);
        console.error(error); // Most likely this is because of billing
      }
    }

    async function confirmCode(): Promise<void> {
      if (!confirm) return;

      try {
        const userCred = await confirm.confirm(code);
        const jsonVal = JSON.stringify(userCred?.user);
        await AsyncStorage.setItem("user", jsonVal); // saves user logged in

        router.replace("/create-account");
      } catch (error) {
        console.log("Invalid code.");
      }
    }
    if (!confirm) {
      return (
        <SafeAreaView style={styles.safeAreaContainer}>
          <TextInput
            value={number}
            onChangeText={(text: string) => setNumber(text)}
            placeholder="+1 650-555-3434"
            placeholderTextColor="grey"
            style={styles.textBox}
            keyboardType="default"
          />
          <Button
            title="Phone Number Sign In"
            onPress={() => signInWithPhoneNumber(number)}
          />
          <Button
            title="Phone Number Sign In"
            onPress={() => router.replace("/(tabs)")}
          />
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <TextInput
          value={code}
          onChangeText={(text: string) => setCode(text)}
          placeholder="Enter verification code"
          placeholderTextColor="white"
          keyboardType="numeric"
          style={styles.textBox}
        />
        <Button title={"Cancel"} onPress={() => setConfirm(null)} />
        <Button title="Confirm Code" onPress={() => confirmCode()} />
      </SafeAreaView>
    );
  }

  return <PhoneSignIn />;
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1, // Take up the full screen height
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  textBox: {
    width: "90%",
    height: 40,
    color: "white",
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
  },
});
