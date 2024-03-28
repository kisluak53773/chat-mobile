import { Image } from 'react-native';
import React, { FC } from 'react';
import { type IAvatarProps } from './@types';

export const Avatar: FC<IAvatarProps> = ({ user }) => {
  return (
    <Image
      className=" w-[65px] h-[65px] rounded-[65px] mb-[5px]"
      resizeMode="cover"
      source={
        user.photoURL
          ? { uri: user.photoURL }
          : require('assets/images/avatar-palceholder.png')
      }
    />
  );
};
