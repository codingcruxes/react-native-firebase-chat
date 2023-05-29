import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Button, Text, View } from '../../components/Themed';
import { firestore } from '../../firebaseConfig';
import { UserInfo } from '../../types';
import React from 'react';
import { TextInput } from 'react-native-paper';
import { colorsOfTheYear } from '../../constants/Colors';
import { UserContext } from '../../context/AuthContext';
import { useRouter } from 'expo-router';

export default function NewChat() {
  const [search, setSearch] = React.useState('');
  const [results, setResults] = React.useState<UserInfo[]>([]);

  const onSearchHandler = async (text: string) => {
    setSearch(text);
    const q = query(collection(firestore, 'users'), where('displayName', '==', text.toLowerCase()));

    try {
      const querySnapshot = await getDocs(q);

      const list = [] as UserInfo[];
      querySnapshot.forEach((doc) => list.push(doc.data() as UserInfo));
      setResults(list);
    } catch (err) {
      console.log('error', err);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput value={search} onChangeText={onSearchHandler} />
      {results.map((user) => (
        <SearchResult username={user.displayName} email={user.email} id={user.uid} key={user.uid} />
      ))}
    </View>
  );
}

function SearchResult({ username, id, email }: { username: string; id: string; email: string }) {
  const { user } = React.useContext(UserContext);
  const router = useRouter();

  const onStartChat = async () => {
    if (user) {
      const ref = doc(firestore, 'users', user.uid);
      const newRoomId = user.uid > id ? user.uid + id : id + user.uid;
      await updateDoc(ref, {
        rooms: arrayUnion(newRoomId),
      });
      const roomRef = doc(firestore, 'rooms', newRoomId);
      const res = await getDoc(roomRef);
      if (res.exists()) {
        router.replace(`/(chat)/messages?id=${newRoomId}`);
        return;
      }
      await setDoc(roomRef, {
        messages: arrayUnion(),
        users: arrayUnion({ username: user.displayName }, { username: username }),
        color: colorsOfTheYear[Math.floor(Math.random() * colorsOfTheYear.length)],
      });
    } else {
      router.push('/');
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 12,
        paddingVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#ffffff60',
        borderTopColor: '#ffffff60',
        borderTopWidth: 1,
        borderBottomWidth: 1,
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 12 }}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: colorsOfTheYear[6],
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text variant="titleMedium">{username.slice(0, 1).toUpperCase()}</Text>
        </View>
        <View>
          <Text variant="titleLarge">{username.charAt(0).toUpperCase() + username.slice(1)}</Text>
          <Text>halecolin1@gmail.com</Text>
        </View>
      </View>
      <Button onPress={() => onStartChat()}>Start Chat</Button>
    </View>
  );
}
