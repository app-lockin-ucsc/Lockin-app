import { Text, View, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Camera from "@/components/Camera";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const [showCamera, setShowCamera] = useState(false);
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Welcome Screen.</Text>

        <Button
          title="Open Camera"
          onPress={() => router.push("/camera-screen")} // Navigate to the camera route
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
