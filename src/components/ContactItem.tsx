import { Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { type IContactItemProps } from './@types';
import { usePathname } from 'expo-router';
import { Avatar } from './Avatar';

export const ContactItem: FC<IContactItemProps> = ({ user }) => {
  const currPath = usePathname();

  return (
    <TouchableOpacity className=" flex-row items-center border-b-[0.5px] mb-[10px]">
      <Avatar user={user} />
      <View className=" items-center justify-center flex-1">
        <Text className=" text-text font-bold text-[16px]">
          {user.contactName || user.displayName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
