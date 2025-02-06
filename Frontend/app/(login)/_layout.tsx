import { Slot, Stack } from "expo-router";

export default function LoginLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login-screen" />
      <Stack.Screen name="create-account" />
    </Stack>
  );
}
