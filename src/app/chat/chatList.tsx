import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '@/config';
import { useGlobalContext } from '@/context';
import { User } from 'firebase/auth';
import { ContactsIcon } from '@/features/chat';

export default function Chat() {
  const { currentUser } = auth;
  const { rooms, setRooms } = useGlobalContext();
  const chatsQuerry = query(
    collection(db, 'rooms'),
    where('participantsArray', 'array-contains', currentUser.email)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuerry, (querySnapshot) => {
      const chats = querySnapshot.docs
        .filter((doc) => doc.data().lastMassage)
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
          userB: doc
            .data()
            .participants.find((p: User) => p.email !== currentUser.email),
        }));
      setRooms(chats);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View className=" flex-1 p-[5px] pr-[10px]">
      <Text>chat</Text>
      <ContactsIcon />
    </View>
  );
}
