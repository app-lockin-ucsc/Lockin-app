import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import auth, { getAuth } from "@react-native-firebase/auth";
import { router } from "expo-router";
import Snackbar from "react-native-snackbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "@expo/vector-icons/Entypo";

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const user = auth().currentUser;

  const handleUserDisplay = () => {
    return user?.displayName || "Enter a username.";
  };

  const handleCloseSettings = () => {
    router.replace("/(tabs)/account");
  };

  const handleDisplayNameRecreation = async (username: string) => {
    if (user && username != "") {
      setLoading(true);
      try {
        await user.updateProfile({
          displayName: username,
        });
        router.replace("/(tabs)/account");

        Snackbar.show({
          text: "Profile updated successfully!",
          duration: Snackbar.LENGTH_SHORT,
        });
      } catch (error) {
        console.error("Error updating profile:", error);
      } finally {
        setLoading(false);
      }
    } else {
      router.replace("/(tabs)/account");
      Snackbar.show({
        text: "Profile updated successfully!",
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };
  const gAuth = getAuth();
  const handleSignout = async () => {
    await gAuth.signOut();
    await AsyncStorage.removeItem("user");
    Snackbar.show({
      text: "User signed out!",
      duration: Snackbar.LENGTH_SHORT,
    });
    router.replace("/(login)/login-screen");
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {loading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <>
          <TouchableOpacity
            style={styles.cameraClose}
            onPress={handleCloseSettings}
          >
            <Entypo name="cross" size={45} color="white" />
          </TouchableOpacity>
          <Text style={styles.textStyle}>Change username:</Text>
          <TextInput
            style={styles.textBox}
            value={displayName}
            onChangeText={setDisplayName}
            placeholder={handleUserDisplay()}
            placeholderTextColor="white"
            keyboardType="default"
          />
          <Button
            title="Save Settings"
            onPress={() => handleDisplayNameRecreation(displayName)}
          />

          <Button title="Sign out" onPress={handleSignout} color={"red"} />
        </>
      )}
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
    color: "white",
    fontSize: 25,
  },
  textBox: {
    width: "90%",
    height: 40,
    color: "white",
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraClose: {
    position: "absolute", // Position the close button absolutely
    top: "5%",
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: 70,
  },
});
