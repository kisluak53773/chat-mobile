import { View, Text, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '@/config';
import { useGlobalContext } from '@/context';
import { User } from 'firebase/auth';
import { ContactsIcon } from '@/features/chat';
import { ContactItem } from '@/components';
import { useContacts } from '@/hooks';

export default function Chat() {
  const { currentUser } = auth;
  const { rooms, setRooms, setUnfilteredRooms } = useGlobalContext();
  const chatsQuerry = query(
    collection(db, 'rooms'),
    where('participantsArray', 'array-contains', currentUser.email)
  );
  const contacts = useContacts();

  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuerry, (querySnapshot) => {
      const chats = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc
          .data()
          .participants.find((p: User) => p.email !== currentUser.email),
      }));
      setUnfilteredRooms(chats);
      setRooms(chats.filter((doc) => 'lastMessage' in doc && doc.lastMessage));
    });

    return () => unsubscribe();
  }, []);

  function getUserB(user: User) {
    const userContact = contacts.find((c) => c.email === user.email);
    if (userContact && userContact.contactName) {
      return { ...user, contactName: userContact.contactName };
    }
    return user;
  }

  return (
    <View className=" flex-1 p-[5px] pr-[10px]">
      {rooms && (
        <FlatList
          data={rooms}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ContactItem
              type="chat"
              room={item}
              description={item.lastMessage.text}
              time={item.lastMessage.createdAt}
              user={getUserB(item.userB)}
            />
          )}
        />
      )}
      <ContactsIcon />
    </View>
  );
}
