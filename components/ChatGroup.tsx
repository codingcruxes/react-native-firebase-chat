import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import { useRouter } from 'expo-router';
import { doc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import React from 'react';

type Room = {
  lastMessage: { text: string; user: { name: string } };
  users: { username: string }[];
  color: string;
};

interface Props {
  roomId: string;
}

export default function ChatGroup({ roomId }: Props) {
  const [data, setData] = React.useState<Room | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    const docRef = doc(firestore, 'rooms', roomId);
    const unsub = onSnapshot(docRef, (doc) => {
      doc.exists() && setData(doc.data() as Room);
    });

    return () => {
      unsub();
    };
  }, [roomId]);

  return (
    <TouchableOpacity onPress={() => router.push(`/(chat)/messages?id=${roomId}`)}>
      <View style={styles.container}>
        <View
          style={{
            ...styles.circle,
            backgroundColor: data?.color ? data.color : '#FF6F61',
          }}>
          <Text variant="titleLarge">
            {data?.lastMessage?.user?.name
              ? data?.lastMessage.user.name.slice(0, 1).toLocaleUpperCase()
              : ''}
          </Text>
        </View>
        <View>
          <Text variant="titleMedium">{data?.users.map((user) => user.username).join(', ')}</Text>
          <Text>
            {data?.lastMessage?.text &&
              (data?.lastMessage.text.length > 40
                ? data.lastMessage.text.slice(0, 40) + '...'
                : data.lastMessage.text)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderTopColor: '#ffffff60',
    borderBottomColor: '#ffffff60',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: 20,
    alignItems: 'center',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
