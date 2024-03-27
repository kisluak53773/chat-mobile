import { View } from 'react-native';
import React, { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { signUp } from '@/config';
import { type IRegisterData } from '../types';
import { SubmitButton } from './SubmitButton';
import { AuthLink } from './AuthLink';
import { REGISTER_FIELDS } from '../constants';
import { FormItem } from './FormItem';

export const RegisterForm: FC = () => {
  const {
    formState: { isValid },
    control,
    reset,
    handleSubmit,
    watch,
  } = useForm<IRegisterData>({ mode: 'onBlur' });
  const password = watch('password');

  const onSubmit: SubmitHandler<IRegisterData> = async (data) => {
    const { email, password } = data;
    await signUp(email, password);
    reset();
  };
  return (
    <View>
      {REGISTER_FIELDS.map((fieldData) => (
        <Controller
          key={fieldData.id}
          control={control}
          name={fieldData.name as 'email' | 'password' | 'passwordRepeat'}
          rules={
            fieldData.name === 'passwordRepeat'
              ? {
                  ...fieldData.rules,
                  validate: (value) =>
                    value === password || 'Password must match',
                }
              : fieldData.rules
          }
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
        title={'Sign up'}
      />
      <AuthLink
        href={'/login'}
        text={'Already have an account?'}
        hrefText={' login'}
      />
    </View>
  );
};
