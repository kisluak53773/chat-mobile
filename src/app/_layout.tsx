import '../global.css';
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { auth } from '@/config';
import { onAuthStateChanged } from 'firebase/auth';
import * as SplashScreen from 'expo-splash-screen';
import { ContextWrapper } from '@/context';
import { useGlobalContext } from '@/context';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants';

SplashScreen.preventAutoHideAsync();

function RootLayoutConfig() {
  const { setCurrUser, currUser } = useGlobalContext();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  console.log('user' + currUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) setCurrUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currUser) router.replace('/login');
    if (currUser) router.replace('/profile');
  }, [currUser]);

  useEffect(() => {
    if (!loading) SplashScreen.hideAsync();
  }, [loading]);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(auth)"
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

export default function RootLayout() {
  return (
    <ContextWrapper>
      <RootLayoutConfig />
    </ContextWrapper>
  );
}
