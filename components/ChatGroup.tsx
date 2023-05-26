import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import { useRouter } from 'expo-router';

interface Props {
  name: string;
  lastMessage: string;
  color: string;
  id: string;
}

export default function ChatGroup({ name, lastMessage, color, id }: Props) {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push(`/(chat)/messages?id=${id}`)}>
      <View style={styles.container}>
        <View style={{ ...styles.circle, backgroundColor: color }}>
          <Text variant="titleLarge">{name.slice(0, 1).toLocaleUpperCase()}</Text>
        </View>
        <View>
          <Text variant="titleMedium">{name}</Text>
          <Text>{lastMessage.length > 40 ? lastMessage.slice(0, 40) + '...' : lastMessage}</Text>
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
