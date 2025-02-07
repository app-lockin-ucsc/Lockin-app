import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";

export default function Account() {
  const user = auth().currentUser;

  const handleSettingsClick = () => {
    router.replace("/settings-page");
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.topAlignment}>
          <Text style={styles.textStyle}>{user?.displayName}</Text>
          <TouchableOpacity
            style={styles.settingsAlignment}
            onPress={handleSettingsClick}
          >
            <Feather name="settings" size={30} color="white" />
          </TouchableOpacity>
        </View>
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
    justifyContent: "space-between",
    alignItems: "center",
  },

  textStyle: {
    color: "white",
    fontSize: 25,
    width: "75%",
    textAlign: "center",
  },
  topAlignment: {
    width: "100%", // Ensures the container takes full width
    flexDirection: "row", // Aligns items in a row
    alignItems: "center", // Align items vertically
    justifyContent: "center", // Centers the display name
    position: "relative", // Allows absolute positioning inside
    padding: 16, // Adds spacing
  },
  settingsAlignment: {
    position: "absolute", // Allows the settings icon to be positioned separately
    right: 10, // Moves it to the far right
  },
});
