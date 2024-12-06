import { Text, View, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const [showCamera, setShowCamera] = useState(false);
  const handleCameraPress = () => {
    router.push("/camera-screen");
    setShowCamera(true);
  };
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Welcome Screen.</Text>
        {/* This button will take you to the camera scene. */}
        <Button
          title="Open Camera"
          onPress={handleCameraPress} // Navigate to the camera route
        />
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
