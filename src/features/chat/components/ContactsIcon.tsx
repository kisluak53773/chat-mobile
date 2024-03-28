import { TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

export const ContactsIcon: FC = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push('/chat/contacts')}
      className=" absolute right-[20px] bottom-[20px] rounded-[60px] w-[60px] h-[60px] bg-secondary justify-center items-center">
      <AntDesign
        name="contacts"
        size={30}
        color="white"
        style={{ transform: [{ scaleX: -1 }] }}
      />
    </TouchableOpacity>
  );
};
