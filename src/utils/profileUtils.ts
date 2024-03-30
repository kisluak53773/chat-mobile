import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/config';
import { nanoid } from 'nanoid';
import 'react-native-get-random-values';

export const pickImage = async () => {
  const result = await ImagePicker.launchCameraAsync();
  return result;
};

export const askForPermission = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  return status;
};

export async function uploadImage(uri: string, path: string, fName?: string) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const fileName = fName || nanoid();
  const imageRef = ref(storage, `${path}/${fileName}.jpeg`);

  const snapshot = await uploadBytes(imageRef, blob, {
    contentType: 'image/jpeg',
  });

  blob.close();

  const url = await getDownloadURL(snapshot.ref);

  return { url, fileName };
}
