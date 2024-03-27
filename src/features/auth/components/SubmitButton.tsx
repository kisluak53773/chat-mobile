import { View, Button } from 'react-native';
import React, { FC } from 'react';
import { type ISubmitButton } from '../types';
import { COLORS } from '@/constants';

export const SubmitButton: FC<ISubmitButton> = ({
  isValid,
  onSubmit,
  handleSubmit,
  title,
}) => {
  return (
    <View className=" mt-[20px]">
      <Button
        color={COLORS.secondary}
        title={title}
        disabled={!isValid}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
