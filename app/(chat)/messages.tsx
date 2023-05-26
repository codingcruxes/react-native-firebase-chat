import { Stack, useRouter, useSearchParams } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

import { Text, View, Button } from '../../components/Themed';
import ErrorDisplay from '../../components/general/Loading/ErrorDisplay';
import { auth } from '../../firebaseConfig';
import errorHandler from '../../helpers/errorHandlerFireStore';
import { UserContext } from '../../context/AuthContext';
import { Screen } from 'react-native-screens';

export default function Messages() {
  const { id } = useSearchParams();
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: id as string,
        }}
      />
      <Message id="current" text="this is a message" />
      <Message id="other" text="this is a message. I made this message longer as a test" />
      <Message id="other" text="this is a message" />
    </View>
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
