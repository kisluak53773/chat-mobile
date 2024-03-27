import { ImagePickerResult } from 'expo-image-picker';
import { Dispatch, SetStateAction } from 'react';

export interface IImagePickerProps {
  selectedImage: string | null;
  setSelectedImage: Dispatch<SetStateAction<string | null>>;
}
