import { useRouter } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar, TextInput } from 'react-native-paper';

import { Text, View, Button } from '../../components/Themed';
import ErrorDisplay from '../../components/general/Loading/ErrorDisplay';
import { auth } from '../../firebaseConfig';
import errorHandler from '../../helpers/errorHandlerFireStore';

interface PasswordResetParam {
  auth: typeof auth;
}

export default function Login() {
  const [visible, setVisible] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const onPasswordResetHandler = async ({ auth }: PasswordResetParam) => {
    setError('');
    setLoading(true);
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        setVisible(true);
      })
      .catch((error) => {
        setError(errorHandler(error));
      });
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Email</Text>
        <TextInput value={email} placeholder="Email" onChangeText={(t) => setEmail(t)} />
      </View>
      <View style={styles.buttons}>
        <Button onPress={() => router.push('/(auth)')} mode="contained" style={{ flex: 1 }}>
          Back
        </Button>
        <Button
          mode="contained"
          onPress={() => onPasswordResetHandler({ auth })}
          style={{ flex: 1 }}>
          {loading ? 'Loading...' : 'Send Reset Link'}
        </Button>
      </View>
      <ErrorDisplay message={error} />
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Close',
          onPress: () => setVisible(false),
        }}>
        <Text>An email link to reset your password has been sent to {email}.</Text>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    rowGap: 20,
  },
  buttons: {
    flexDirection: 'row',
    columnGap: 12,
    alignItems: 'stretch',
  },
});
