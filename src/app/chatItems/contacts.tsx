import { View, FlatList } from 'react-native';
import React from 'react';
import { useContacts } from '@/hooks';
import { ContactPreview } from '@/features/contacts';

export default function Contacts() {
  const contacts = useContacts();

  return (
    <View className=" flex-1">
      <FlatList
        className=" p-[10px]"
        data={contacts}
        renderItem={({ item }) => (
          <ContactPreview
            contact={item}
            image="str"
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
