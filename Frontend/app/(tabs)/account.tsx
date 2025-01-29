import { FIREBASE_AUTH } from "@/FirebaseConfig";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  Alert,
} from "react-native";

export default function Account() {
  const handleSignout = () => {
    FIREBASE_AUTH.signOut();
    Alert.alert("signed out!");
  };

  const user = FIREBASE_AUTH.currentUser;

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>{user?.email}</Text>
      </View>
      <Button title="Sign out!" onPress={handleSignout}></Button>
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
    color: "white",
    fontSize: 25,
  },
});
