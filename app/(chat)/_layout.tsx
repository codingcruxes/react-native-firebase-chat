import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs, useRouter } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { View } from '../../components/Themed';
import { TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { UserContext } from '../../context/AuthContext';

export default function TabLayout() {
  const theme = useTheme();
  const router = useRouter();
  const { clearUser } = useContext(UserContext);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: { backgroundColor: theme.colors.background },
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: '#ffffff',
      }}>
      <Tabs.Screen
        name="chats"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="message" color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color }) => <TabBarIcon name="account" color={color} />,
          headerRight: () => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 12,
              }}>
              <TouchableOpacity
                onPress={() => {
                  clearUser();
                  router.replace('../(auth)');
                }}>
                <MaterialCommunityIcons size={24} color="white" name="logout" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

function TabBarIcon(props: { name: string; color: string }) {
  //@ts-ignore
  return <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}
