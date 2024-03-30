import { Tabs } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { CHAT_HEADER } from '@/constants';
import { Fontisto } from '@expo/vector-icons';

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
        name="profile"
        options={{
          headerTitle: 'Profile',
          title: 'Profile',
          ...CHAT_HEADER,
          tabBarIcon: ({ color }) => (
            <Fontisto
              name="person"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
