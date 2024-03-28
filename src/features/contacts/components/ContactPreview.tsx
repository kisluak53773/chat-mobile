import React, { FC, useEffect, useState } from 'react';
import { useGlobalContext } from '@/context';
import { type IContactPreviewProps } from '../types';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/config';
import { ContactItem } from '@/components';

export const ContactPreview: FC<IContactPreviewProps> = ({
  image,
  contact,
}) => {
  const { rooms } = useGlobalContext();
  const [user, setUser] = useState(contact);

  useEffect(() => {
    const q = query(
      collection(db, 'users'),
      where('email', '==', contact.email)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.docs.length) {
        const userDoc = snapshot.docs[0].data();
        setUser((prevUser) => ({ ...prevUser, userDoc }));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ContactItem
      type="contacts"
      user={user}
      room={rooms.find((room) =>
        room.participantsArray.includes(contact.email)
      )}
    />
  );
};
