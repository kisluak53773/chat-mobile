import { COLORS } from '@/constants';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="register"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerStyle: {
            backgroundColor: COLORS.foreground,
          },
          headerTintColor: COLORS.white,
        }}
      />
    </Stack>
  );
}
