import { Alert, StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router";

export default function CreateAccount() {
  const [displayName, setDisplayName] = useState("");
  const user = auth().currentUser;

  const handleDisplayNameCreation = async (name: string) => {
    if (user) {
      try {
        await user.updateProfile({
          displayName: displayName,
        });
        router.replace("/(tabs)");
        console.log("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };
  // +1 650-555-3434

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <TextInput
        style={styles.textBox}
        value={displayName}
        onChangeText={setDisplayName}
        placeholder="Enter a username"
        placeholderTextColor="white"
        keyboardType="default"
      />
      <Button
        title="Continue"
        onPress={() => handleDisplayNameCreation(displayName)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1, // Take up the full screen height
    backgroundColor: "#0D0D0D",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 25,
    color: "white",
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
