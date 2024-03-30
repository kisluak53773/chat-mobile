import { Image } from 'react-native';
import React, { FC } from 'react';
import { type IAvatarProps } from './@types';

export const Avatar: FC<IAvatarProps> = ({ user, small = false }) => {
  return (
    <Image
      className={
        small
          ? `w-[40px] h-[40px] rounded-[40px] mb-[5px]`
          : `w-[65px] h-[65px] rounded-[65px] mb-[5px]`
      }
      resizeMode="cover"
      source={
        'photoURL' in user && user.photoURL
          ? { uri: user.photoURL }
          : require('assets/images/avatar-palceholder.png')
      }
    />
  );
};
