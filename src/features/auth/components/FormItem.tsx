import React, { FC } from 'react';
import { Text, TextInput } from 'react-native';
import { type IFormItemProps } from '../types';

export const FormItem: FC<IFormItemProps> = ({
  type,
  placeholder,
  error,
  value,
  onBlur,
  onChange,
}) => {
  return (
    <>
      <TextInput
        secureTextEntry={type === 'password'}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        className=" border-b-primary border-b-[2px] w-[200px] mt-[5px]"
      />
      {error && <Text className=" text-red-300">{error.message}</Text>}
    </>
  );
};
