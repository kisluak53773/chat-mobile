import React from 'react';
import { Stack } from 'expo-router';
import { CHAT_HEADER } from '@/constants';

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="contacts"
        options={{
          headerTitle: 'Contacts',
          ...CHAT_HEADER,
        }}
      />
      <Stack.Screen
        name="[user]"
        options={{
          ...CHAT_HEADER,
        }}
      />
    </Stack>
  );
}
