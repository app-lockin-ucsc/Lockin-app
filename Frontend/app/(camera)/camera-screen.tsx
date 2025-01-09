import { Text, View, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CameraComponent from "@/components/CameraComponent";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <CameraComponent />
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
  },
});
