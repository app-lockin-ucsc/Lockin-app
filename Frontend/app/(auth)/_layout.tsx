// app/(auth)/_layout.tsx
import { Stack } from "expo-router/stack";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="signup-screen"
        options={{ headerShown: false, gestureEnabled: false }} // Hide header for signup
      />
      <Stack.Screen
        name="login-screen"
        options={{ headerShown: false, gestureEnabled: false }} // Hide header for signin
      />
    </Stack>
  );
}
