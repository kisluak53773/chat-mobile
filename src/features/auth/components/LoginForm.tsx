import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { signIn } from '@/config';
import { type ILoginData } from '../types';
import { SubmitButton } from './SubmitButton';
import { LOGIN_FIELDS } from '../constants';
import { FormItem } from './FormItem';
import { AuthLink } from './AuthLink';

export const LoginForm: FC = () => {
  const {
    formState: { isValid },
    control,
    reset,
    handleSubmit,
  } = useForm<ILoginData>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<ILoginData> = async (data) => {
    const { email, password } = data;
    await signIn(email, password);
    reset();
  };

  return (
    <View className="mt-[20px]">
      {LOGIN_FIELDS.map((fieldData) => (
        <Controller
          key={fieldData.id}
          control={control}
          name={fieldData.name as 'email' | 'password'}
          rules={fieldData.rules}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <FormItem
              type={fieldData.type}
              placeholder={fieldData.placeholder}
              error={error}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      ))}
      <SubmitButton
        isValid={isValid}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        title={'Sign in'}
      />
      <AuthLink
        href={'/register'}
        text={"Don't have an account?"}
        hrefText={' register'}
      />
    </View>
  );
};
