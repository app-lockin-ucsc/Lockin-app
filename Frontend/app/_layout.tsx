import { Stack } from "expo-router/stack";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSortedScreens } from "expo-router/build/useScreens";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";

export default function Layout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if the user is logged in or not
  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log(user); // This will log whenever the 'user' state changes
  }, [user]); // This will only run when the 'user' state changes

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <Stack>
      {user ? (
        <>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(camera)"
            options={{ headerShown: false }} // No header for the camera screen
          />
          <Stack.Screen
            name="(feed)"
            options={{ headerShown: false }} // No header for the feed screen
          />
        </>
      ) : (
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false }} // No header for the auth screen
        />
      )}
    </Stack>
  );
}
