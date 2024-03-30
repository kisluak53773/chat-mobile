import { Tabs } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { CHAT_HEADER } from '@/constants';

export default function AuthLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="chatList"
        options={{
          headerTitle: 'Chat',
          title: 'Chat',
          ...CHAT_HEADER,
          tabBarIcon: ({ color }) => (
            <Entypo
              name="chat"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="photo"
        options={{
          headerTitle: 'Photo',
          title: 'Photo',
          ...CHAT_HEADER,
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="photo"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
