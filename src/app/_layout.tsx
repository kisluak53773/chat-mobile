import '../global.css';
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { auth } from '@/config';
import { onAuthStateChanged } from 'firebase/auth';
import * as SplashScreen from 'expo-splash-screen';
import { ContextWrapper } from '@/context';
import { useRouter } from 'expo-router';

SplashScreen.preventAutoHideAsync();

function RootLayoutConfig() {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  console.log(currUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setCurrUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currUser) router.replace('/login');
    if (currUser && !currUser.displayName) router.replace('/profile');
    if (currUser && currUser.displayName) router.replace('/chat/chatList');
  }, [currUser]);

  useEffect(() => {
    if (loading) SplashScreen.hideAsync();
  }, [loading]);

  return (
    <Stack>
      <Stack.Screen
        name="chat"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false }}
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
