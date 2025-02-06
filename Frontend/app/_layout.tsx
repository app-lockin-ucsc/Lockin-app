import { Stack } from "expo-router/stack";
import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Layout() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAlreadySignedIn = async () => {
      const userStored = await AsyncStorage.getItem("user");
      if (userStored) {
        setUser(JSON.parse(userStored));
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    checkAlreadySignedIn();

    const subscriber = auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
      setLoading(false);

      if (authUser) {
        AsyncStorage.setItem("user", JSON.stringify(authUser));
        setUser(authUser); // Update the user state
      } else {
        AsyncStorage.removeItem("user");
        setUser(null);
      }
      setLoading(false);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(login)/login-screen");
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(camera)"
        options={{ headerShown: false }} // No header for the camera screen
      />
      <Stack.Screen
        name="(feed)"
        options={{ headerShown: false }} // No header for the feed screen
      />
      <Stack.Screen
        name="(login)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
