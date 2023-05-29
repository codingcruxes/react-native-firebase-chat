import { Stack, useSearchParams } from 'expo-router';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Text, View } from '../../components/Themed';
import { firestore } from '../../firebaseConfig';
import { UserContext } from '../../context/AuthContext';
import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import {
  Actions,
  ActionsProps,
  Bubble,
  BubbleProps,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  Send,
  SendProps,
} from 'react-native-gifted-chat';

export default function Messages() {
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const { user } = React.useContext(UserContext);
  const { id } = useSearchParams();

  React.useEffect(() => {
    const roomRef = doc(firestore, 'rooms', id as string);

    const unSub = onSnapshot(roomRef, (doc) => {
      doc.exists() &&
        setMessages(
          doc.data().messages.map((message: any) => ({
            ...message,
            createdAt: message.createdAt.toDate(),
          }))
        );
    });

    return () => {
      unSub();
    };
  }, [id]);

  const onSend = async (messages: IMessage[]) => {
    const roomRef = doc(firestore, 'rooms', id as string);
    await updateDoc(roomRef, {
      messages: arrayUnion(messages[0]),
      lastMessage: messages[0],
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Messages',
        }}
      />
      <GiftedChat
        renderBubble={ThemedBubble}
        renderInputToolbar={ThemedInputToolbar}
        minInputToolbarHeight={60}
        messages={messages.reverse()}
        showAvatarForEveryMessage
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user ? user.uid : 'Not logged it',
          name: user ? (user.displayName as string) : 'No Display Name',
          avatar: user?.photoURL ? user.photoURL : '',
        }}
      />
      {/* {messages.map((message) => (
        <Message id={message.senderId} text={message.text} key={message.id} />
      ))}
      <TextInput /> */}
    </View>
  );
}

function ThemedActions(props: ActionsProps) {
  return <Actions {...props} />;
}

function ThemedSend(props: SendProps<IMessage>) {
  const theme = useTheme();
  return <Send {...props} textStyle={{ color: theme.colors.primary }} />;
}

function ThemedInputToolbar(props: InputToolbarProps<IMessage>) {
  return (
    <InputToolbar
      {...props}
      containerStyle={{ backgroundColor: '#303030' }}
      optionTintColor="#fff"
      renderSend={ThemedSend}
      renderActions={ThemedActions}
      //@ts-ignore This is an avalible property
      textInputStyle={{ color: '#fff' }}
    />
  );
}
function ThemedBubble(props: BubbleProps<IMessage>) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#5eada6cf',
        },
        left: {
          backgroundColor: '#d3d8d835',
          // backgroundColor: '#83fcf225',
        },
      }}
      textStyle={{
        left: { color: '#fff' },
      }}
    />
  );
}

function Message({ id, text }: { id: string; text: string }) {
  const { user } = useContext(UserContext);
  const { colors } = useTheme();

  return (
    <View style={id === 'current' ? styles.userContainer : styles.otherContainer}>
      <View
        style={{
          ...styles.current,
          backgroundColor: id === 'current' ? colors.primary : 'grey',
        }}>
        <Text>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    rowGap: 20,
    flexDirection: 'column-reverse',
  },
  userContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  otherContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  current: {
    padding: 6,
    borderRadius: 4,
    maxWidth: '80%',
  },
});
