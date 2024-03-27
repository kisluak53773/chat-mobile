import { View, Text, Image } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LoginForm } from '@/features/auth';

export default function Login() {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: top }}
      className=" flex-1 bg-white justify-center items-center">
      <Text className=" text-foreground text-[24px] mb-[20px]">
        Welcome to Whatsapp
      </Text>
      <Image
        source={require('assets/images/welcome-img.png')}
        className=" w-[180px] h-[180px]"
      />
      <LoginForm />
    </View>
  );
}
