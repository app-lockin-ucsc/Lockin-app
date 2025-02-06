import { Text, View, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CircularProgress from "@/components/CircularProgress";
import { Component } from "react";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const [showCamera, setShowCamera] = useState(false);
  const navigateToCamera = () => {
    router.push("/camera-screen");
    setShowCamera(true);
  };
  const navigateToFeed = () => {
    router.push("/(feed)/feed-screen");
  };
  const navigateToLogin = () => {
    // README: Temporary to test login screen. This will be the first screen when piecing the app together
    router.push("/login-screen");
  };
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Welcome Screen.</Text>
        <CircularProgress />
        {/* This button will take you to the camera scene. */}
        <Button
          title="Open Camera"
          onPress={navigateToCamera} // Navigate to the camera route
        />
        <Button
          title="Open Feed"
          onPress={navigateToFeed} // Navigate to the camera route
        />
        {/* <Button title={"Login"} onPress={navigateToLogin} // Navigate to login
        /> */}
      </View>
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
    justifyContent: "flex-start",
    alignItems: "center",
  },

  textStyle: {
    fontSize: 25,
    color: "white",
  },
});
