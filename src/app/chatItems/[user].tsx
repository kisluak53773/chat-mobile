// @refresh reset
import {
  View,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useCallback, useEffect, useId, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Avatar } from '@/components';
import { useGlobalContext } from '@/context';
import { auth, db } from '@/config';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  Actions,
  Bubble,
  GiftedChat,
  InputToolbar,
} from 'react-native-gifted-chat';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants';
import { pickImage, uploadImage } from '@/utils/inedx';
import ImageView from 'react-native-image-viewing';

interface IParticipantsData {
  displayName: string;
  email: string;
  photoURL?: string;
}

export default function ChatItem() {
  const [messages, setMessages] = useState([]);
  const [roomHash, setRoomHash] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageView, setSeletedImageView] = useState('');
  const { user } = useLocalSearchParams();
  const { companion, selectedRoom } = useGlobalContext();
  const { currentUser } = auth;
  const randomId = useId();
  const senderUser = currentUser.photoURL
    ? {
        name: currentUser.displayName,
        _id: currentUser.uid,
        avatar: currentUser.photoURL,
      }
    : { name: currentUser.displayName, _id: currentUser.uid };
  const roomId = selectedRoom ? selectedRoom.id : randomId;
  const roomRef = doc(db, 'rooms', roomId);
  const roomMessagesRef = collection(db, 'rooms', roomId, 'messages');
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!selectedRoom) {
        const currUserData: IParticipantsData = {
          displayName: currentUser.displayName,
          email: currentUser.email,
        };
        if (currentUser.photoURL) {
          currUserData.photoURL = currentUser.photoURL;
        }
        const userBData: IParticipantsData = {
          displayName:
            'contactName' in companion
              ? companion.contactName
              : companion.displayName || '',
          email: companion.email,
        };
        if ('photoURL' in companion && companion.photoURL) {
          userBData.photoURL = companion.photoURL;
        }
        const roomData = {
          participants: [currUserData, userBData],
          participantsArray: [currentUser.email, companion.email],
        };
        try {
          await setDoc(roomRef, roomData);
        } catch (error) {
          console.log(error);
        }
      }
      const emailHash = `${currentUser.email}:${companion.email}`;
      setRoomHash(emailHash);
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(roomMessagesRef, (querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === 'added')
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFirestore);
    });

    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  const handleSend = async (messages = []) => {
    const writes = messages.map((m) => addDoc(roomMessagesRef, m));
    const lastMessage = messages[messages.length - 1];
    await Promise.all([...writes, updateDoc(roomRef, { lastMessage })]);
  };

  const sendImage = async (uri: string, roomPath?: string) => {
    const { url, fileName } = await uploadImage(
      uri,
      `images/rooms/${roomPath || roomHash}`
    );
    const message = {
      _id: fileName,
      text: '',
      createdAt: new Date(),
      user: senderUser,
      image: url,
    };
    const lastMessage = { ...message, text: 'Image' };
    await Promise.all([
      addDoc(roomMessagesRef, message),
      updateDoc(roomRef, { lastMessage }),
    ]);
  };

  const handlePhotoPicker = async () => {
    const result = await pickImage();
    if (!result.canceled) {
      await sendImage(result.assets[0].uri);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: user as string,
          headerLeft: () => (
            <>
              <Pressable
                className=" justify-center items-center"
                onPress={() => router.back()}>
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color="white"
                />
              </Pressable>
              <View className=" ml-[20px] mr-[20px]">
                <Avatar
                  user={companion}
                  small={true}
                />
              </View>
            </>
          ),
        }}
      />
      <ImageBackground
        className=" flex-1"
        resizeMode="cover"
        source={require('assets/images/chatbg.png')}>
        <GiftedChat
          onSend={handleSend}
          messages={messages}
          user={senderUser}
          renderAvatar={null}
          renderActions={(props) => (
            <Actions
              {...props}
              containerStyle={{
                position: 'absolute',
                right: 50,
                bottom: 5,
                zIndex: 9999,
              }}
              onPressActionButton={handlePhotoPicker}
              icon={() => (
                <Ionicons
                  name="camera"
                  size={30}
                  color={COLORS.iconGray}
                />
              )}
            />
          )}
          timeTextStyle={{ right: { color: COLORS.iconGray } }}
          renderSend={({ text, onSend }) => {
            return (
              <TouchableOpacity
                className=" h-[35px] w-[35px] rounded-[35px] bg-primary justify-center items-center mb-[5px] mr-[10px]"
                onPress={() => {
                  if (text && onSend) {
                    onSend(
                      {
                        text: text.trim(),
                        user: senderUser,
                        _id: `${Math.floor(Math.random() * 10000)}`,
                      },
                      true
                    );
                  }
                }}>
                <Ionicons
                  name="send"
                  size={20}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            );
          }}
          renderInputToolbar={(props) => (
            <InputToolbar
              {...props}
              containerStyle={{
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 2,
                borderRadius: 20,
                paddingTop: 5,
              }}
            />
          )}
          renderBubble={(props) => (
            <Bubble
              {...props}
              textStyle={{ right: { color: COLORS.text } }}
              wrapperStyle={{
                left: {
                  backgroundColor: COLORS.white,
                },
                right: {
                  backgroundColor: COLORS.tertiary,
                },
              }}
            />
          )}
          renderMessageImage={({ currentMessage }) => {
            return (
              <View style={{ borderRadius: 15, padding: 2 }}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                    setSeletedImageView(currentMessage.image);
                  }}>
                  <Image
                    resizeMode="contain"
                    className=" w-[200px] h-[200px] p-[2px] rounded-[15px] object-cover"
                    source={{ uri: currentMessage.image }}
                  />
                  {selectedImageView ? (
                    <ImageView
                      imageIndex={0}
                      visible={modalVisible}
                      onRequestClose={() => setModalVisible(false)}
                      images={[{ uri: selectedImageView }]}
                    />
                  ) : null}
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </ImageBackground>
    </>
  );
}
