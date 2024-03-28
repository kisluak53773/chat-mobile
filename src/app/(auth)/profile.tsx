import { View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { ImagePicker } from '@/features/profile';
import { COLORS } from '@/constants';
import { uploadImage } from '@/utils/profileUtils';
import { auth, db } from '@/config';
import { updateProfile } from '@firebase/auth';
import { doc, setDoc } from '@firebase/firestore';
import { useRouter } from 'expo-router';

interface IUserData {
  displayName: string;
  email: string;
  photoUrl?: string;
}

export default function profile() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    const user = auth.currentUser;
    let photoUrl: string;
    if (selectedImage) {
      const { url } = await uploadImage(
        selectedImage,
        `images/${user.uid}`,
        'profilePicture'
      );
      photoUrl = url;
    }

    const userData: IUserData = {
      displayName,
      email: user.email,
    };

    if (photoUrl) userData.photoUrl = photoUrl;

    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(db, 'users', user.uid), { ...userData, uid: user.uid }),
    ]);

    router.navigate('/');
  };

  return (
    <View className=" flex-1 justify-center items-center p-[20px]">
      <Text className=" text-foreground text-[22px]">Profile</Text>
      <Text className=" text-text text-[14px] mt-[20px]">
        Please provide your name and optionally photo
      </Text>
      <ImagePicker
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <TextInput
        placeholder="Type your name"
        value={displayName}
        onChangeText={setDisplayName}
        className=" border-b-primary mt-[40px] border-b-[2px] w-[100%]"
      />
      <View className=" mt-auto w-[80px]">
        <Button
          onPress={handleSubmit}
          title="Next"
          color={COLORS.secondary}
          disabled={!displayName}
        />
      </View>
    </View>
  );
}
