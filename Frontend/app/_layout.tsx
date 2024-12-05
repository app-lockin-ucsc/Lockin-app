import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(camera)"
        options={{ headerShown: false }} // No header for the camera screen
      />
    </Stack>
  );
}
