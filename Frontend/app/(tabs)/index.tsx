import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Welcome Screen.</Text>
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
