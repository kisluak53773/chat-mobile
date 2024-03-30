import { Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { type IContactItemProps } from './@types';
import { useRouter } from 'expo-router';
import { Avatar } from './Avatar';
import { useGlobalContext } from '@/context';

export const ContactItem: FC<IContactItemProps> = ({
  user,
  time,
  description,
  room,
  image,
  type,
}) => {
  const router = useRouter();
  const { setCompanion, setSelectedRoom, setImage } = useGlobalContext();

  const handlePress = () => {
    setSelectedRoom(room);
    setImage(image);
    setCompanion(user);
    router.push(
      `/chatItems/${
        'contactName' in user ? user.contactName : user.displayName
      }`
    );
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className=" flex-row items-center border-b-[0.5px] mb-[10px]">
      <Avatar user={user} />
      <View className="flex-1">
        <View
          className={
            type === 'chat'
              ? ' flex-row ml-[10px]'
              : ' items-center justify-center flex-1'
          }>
          <Text className=" text-text font-bold text-[16px]">
            {'contactName' in user ? user.contactName : user.displayName}
          </Text>
          {time && (
            <Text className=" text-[11px] ml-auto text-secondaryText">
              {new Date(time.seconds * 1000).toLocaleDateString()}
            </Text>
          )}
        </View>
        {description && (
          <Text className=" text-[13px] ml-[10px] text-secondaryText">
            {description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
