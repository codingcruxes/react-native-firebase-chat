import { Text, View } from '../../Themed';

export default function ErrorDisplay({ message }: { message: string }) {
  if (message === '') return null;
  return (
    <View>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#ffffff90',
          borderRadius: 6,
          padding: 6,
          margin: 20,
        }}>
        <Text>Error: {message}</Text>
      </View>
    </View>
  );
}
