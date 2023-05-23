import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function TabLayout() {
  const theme = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: { backgroundColor: theme.colors.background },
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: '#ffffff',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <TabBarIcon name="login" color={color} />,
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: 'Register',
          tabBarIcon: ({ color }) => <TabBarIcon name="account-plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="resetPassword"
        options={{
          title: 'Reset Password',
          href: null,
        }}
      />
    </Tabs>
  );
}

function TabBarIcon(props: { name: string; color: string }) {
  //@ts-ignore
  return <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}
