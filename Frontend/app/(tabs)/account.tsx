import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import auth, { getAuth } from "@react-native-firebase/auth";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";

export default function Account() {
  const auth = getAuth();
  const user = auth.currentUser;
  const handleSignout = async () => {
    await auth.signOut();
    await AsyncStorage.removeItem("user");
    Alert.alert("User signed out!");
    router.replace("/(login)/login-screen");
  };

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
        <Button title="Sign out" onPress={handleSignout} />
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
  },
  topAlignment: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  settingsAlignment: {
    position: "absolute",
    left: 200,
  },
});
