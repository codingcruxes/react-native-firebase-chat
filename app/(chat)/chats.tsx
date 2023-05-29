import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

import { Text, View } from '../../components/Themed';
import { auth, firestore } from '../../firebaseConfig';
import ChatGroup from '../../components/ChatGroup';
import { UserContext } from '../../context/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';

interface SubmitParam {
  email: string;
  password: string;
  auth: typeof auth;
}

export default function Room() {
  const [rooms, setRooms] = React.useState([]);
  const { user } = useContext(UserContext);
  const router = useRouter();

  React.useEffect(() => {
    const userRef = doc(firestore, 'users', user.uid);

    const unSub = onSnapshot(userRef, (doc) => {
      doc.exists() && setRooms(doc.data().rooms);
    });

    return () => {
      unSub();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {rooms ? (
          rooms.map((room) => <ChatGroup roomId={room} key={room} />)
        ) : (
          <View
            style={{
              padding: 6,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: '#ffffff60',
              margin: 20,
            }}>
            <Text>You aren't in any rooms. Press the "+" to start a chat.</Text>
          </View>
        )}
      </ScrollView>
      <FAB icon="plus" style={styles.fab} onPress={() => router.push('/(chat)/newChat')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 100,
  },
});
