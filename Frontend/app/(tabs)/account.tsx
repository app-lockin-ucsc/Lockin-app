import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  Alert,
} from "react-native";
import auth, { getAuth } from "@react-native-firebase/auth";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Account() {
  const auth = getAuth();
  const user = auth.currentUser;
  const handleSignout = async () => {
    await auth.signOut();
    await AsyncStorage.removeItem("user");
    Alert.alert("User signed out!");
    router.replace("/(login)/login-screen");
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>{user?.displayName}</Text>
        <Button title="Sign out" onPress={handleSignout}></Button>
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
});
