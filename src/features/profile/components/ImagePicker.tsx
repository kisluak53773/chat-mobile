import { TouchableOpacity, Image, Text, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { type IImagePickerProps } from '../types/@types';
import { COLORS } from '@/constants';
import { pickImage, askForPermission } from '@/utils/profileUtils';
import { ActivityIndicator } from 'react-native';

export const ImagePicker: FC<IImagePickerProps> = ({
  selectedImage,
  setSelectedImage,
}) => {
  const [permissionStatus, setPermissionStatus] = useState(null);

  useEffect(() => {
    (async () => {
      const status = await askForPermission();
      setPermissionStatus(status);
    })();
  }, []);

  async function handleProfilePicture() {
    const result = await pickImage();
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  }

  if (!permissionStatus) {
    return (
      <View className=" flex-1 justify-center items-center">
        <ActivityIndicator
          size={'large'}
          color={COLORS.iconGray}
        />
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={handleProfilePicture}
      className=" mt-[30px] bg-[#ece5dd] rounded-[120px] w-[120px] h-[120px] justify-center items-center">
      {!selectedImage ? (
        <MaterialCommunityIcons
          name="camera-plus"
          color={COLORS.iconGray}
          size={45}
        />
      ) : (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: '100%', height: '100%', borderRadius: 120 }}
        />
      )}
    </TouchableOpacity>
  );
};
