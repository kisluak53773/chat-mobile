import { Text } from 'react-native';
import React, { FC } from 'react';
import { Link } from 'expo-router';
import { type IAuthLinkProps } from '../types';

export const AuthLink: FC<IAuthLinkProps> = ({ href, text, hrefText }) => {
  return (
    <Text className=" mt-[15px]">
      {text}
      <Link
        className=" text-secondary"
        href={href}>
        {hrefText}
      </Link>
    </Text>
  );
};
