import { View, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ImagePicker } from '@/features/profile';
import { auth, db } from '@/config';
import { COLORS } from '@/constants';
import { signOut, updateProfile } from 'firebase/auth';
import { uploadImage } from '@/utils/profileUtils';
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

interface IUserData {
  displayName: string;
  email: string;
  photoUrl?: string;
}

export default function Photo() {
  const { currentUser } = auth;
  const usersQuerry = query(
    collection(db, 'users'),
    where('email', '==', currentUser.email)
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [querryUser, setQuerryUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(usersQuerry, (querySnapshot) => {
      const user = querySnapshot.docs
        .find((doc) => doc.data().email === currentUser.email)
        .data();
      setSelectedImage(user.photoUrl);
      setQuerryUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => await signOut(auth);

  const handleSave = async () => {
    if (selectedImage) {
      const { url } = await uploadImage(
        selectedImage,
        `images/${currentUser.uid}`,
        'profilePicture'
      );
      await updateDoc(doc(db, 'users', currentUser.uid), {
        ...querryUser,
        photoUrl: url,
      });
    }
  };

  return (
    <View className=" flex-1 items-center justify-center">
      <ImagePicker
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <View className=" w-[200px] mt-[20px]">
        <Button
          onPress={handleSave}
          title="Save image"
          color={COLORS.secondary}
        />
      </View>
      <View className=" w-[80px] mt-[20px]">
        <Button
          onPress={handleSignOut}
          title="Sign out"
          color={COLORS.secondary}
        />
      </View>
    </View>
  );
}
