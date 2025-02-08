import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Feed from "@/components/Feed";

export default function Index() {
  const router = useRouter();

  const navigateToHome = () => {
    router.push("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={navigateToHome}>
        <Text style={styles.textStyle}>Go back</Text>
      </TouchableOpacity>
      <Feed />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1, // Take up the full screen height
    backgroundColor: "#0D0D0D",
  },
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  textStyle: {
    fontSize: 25,
    color: "white",
  },
});
