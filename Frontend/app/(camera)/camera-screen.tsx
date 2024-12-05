import { Text, View, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Camera from "@/components/Camera";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const [showCamera, setShowCamera] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>ca Screen.</Text>
        <Button
          title="Go Back"
          onPress={() => router.back()} // Navigate back to the tabs
        />

        {/* SOMEWHERE IN HERE I NEED TO CHANGE
         SO WHEN IM ON THE CAMERA PAGE I JUST INSTANTLY OPEN THE CAMERA! */}
        {showCamera ? (
          <Camera />
        ) : (
          <Button title="Open Camera" onPress={() => setShowCamera(true)} />
        )}
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
