import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import { Text, View, Button } from '../../components/Themed';
import ErrorDisplay from '../../components/general/Loading/ErrorDisplay';
import { auth, firestore } from '../../firebaseConfig';
import errorHandler from '../../helpers/errorHandlerFireStore';
import { UserContext } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';

export default function Register() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordVisible, setPasswordVisible] = React.useState(true);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const { setUser } = React.useContext(UserContext);

  const router = useRouter();

  const registerUser = async (name: string) => {
    setError('');
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(firestore, 'users', res.user.uid), {
        uid: res.user.uid,
        displayName: name.toLowerCase(),
        email: res.user.email,
        photoUrl: '',
      });

      if (auth.currentUser)
        await updateProfile(auth.currentUser, { displayName: name.toLowerCase() });

      setUser(res.user);
      router.push('/(chat)/chats');

      setLoading(false);
    } catch (error) {
      setError(errorHandler(error));

      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Name</Text>
        <TextInput placeholder="Name" value={name} onChangeText={(text) => setName(text)} />
      </View>
      <View>
        <Text>Email</Text>
        <TextInput placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput
          secureTextEntry={passwordVisible}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          right={<TextInput.Icon icon="eye" onPress={() => setPasswordVisible((p) => !p)} />}
        />
      </View>
      <View>
        <Text>Confirm Password</Text>
        <TextInput
          secureTextEntry={passwordVisible}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          right={<TextInput.Icon icon="eye" onPress={() => setPasswordVisible((p) => !p)} />}
        />
      </View>
      <View>
        <Button mode="contained" onPress={() => registerUser(name)}>
          {loading ? 'Loading...' : 'Register'}
        </Button>
        <ErrorDisplay message={error} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    rowGap: 20,
  },
  header: {
    padding: 6,
    borderColor: '#eeeeee60',
    borderBottomWidth: 1,
    width: '100%',
  },
  title: {
    color: '#eee',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
