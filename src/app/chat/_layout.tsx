import { COLORS } from '@/constants';
import { Tabs } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function AuthLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="chatList"
        options={{
          headerTitle: 'Chat',
          title: 'Chat',
          headerStyle: {
            backgroundColor: COLORS.foreground,
          },
          headerTintColor: COLORS.white,
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
          headerStyle: {
            backgroundColor: COLORS.foreground,
          },
          headerTintColor: COLORS.white,
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="photo"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          href: null,
          headerTitle: 'Contacts',
          title: 'Photo',
          headerStyle: {
            backgroundColor: COLORS.foreground,
          },
          headerTintColor: COLORS.white,
        }}
      />
    </Tabs>
  );
}
