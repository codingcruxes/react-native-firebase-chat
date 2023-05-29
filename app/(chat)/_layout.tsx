import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Stack, useRouter } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { View } from '../../components/Themed';
import { TouchableOpacity } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';

export default function TabLayout() {
  const theme = useTheme();
  const router = useRouter();
  const auth = getAuth();

  const logout = async () => {
    await signOut(auth);
    router.push('/');
  };
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: '#ffffff',
      }}>
      <Stack.Screen
        name="chats"
        options={{
          title: 'Messages',
          headerBackVisible: false,
          headerRight: () => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={logout}>
                <MaterialCommunityIcons name="logout" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen name="messages" />
    </Stack>
  );
}
