import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

import { Text, View, Button } from '../../components/Themed';
import ErrorDisplay from '../../components/general/Loading/ErrorDisplay';
import { auth } from '../../firebaseConfig';
import errorHandler from '../../helpers/errorHandlerFireStore';

interface SubmitParam {
  email: string;
  password: string;
  auth: typeof auth;
}

export default function Chat() {
  return (
    <View style={styles.container}>
      <Text>Chat Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    rowGap: 20,
  },
});
