import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

import { Text, View, Button } from '../../components/Themed';
import ErrorDisplay from '../../components/general/Loading/ErrorDisplay';
import { auth, firestore } from '../../firebaseConfig';
import errorHandler from '../../helpers/errorHandlerFireStore';
import ChatGroup from '../../components/ChatGroup';
import { colorsOfTheYear } from '../../constants/Colors';
import { UserContext } from '../../context/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';

interface SubmitParam {
  email: string;
  password: string;
  auth: typeof auth;
}

export default function Room() {
  const { user } = useContext(UserContext);

  // React.useEffect(() => {
  //   const getRecords = async () => {
  //     const q = query(collection(firestore, 'users'));
  //     try {
  //       const querySnap = await getDocs(q);
  //       const list = [] as UserType[];
  //       querySnap.forEach((doc) => list.push(doc.data() as UserType));
  //       setUsers(list);
  //     } catch (error) {
  //       console.log('ERROR', error);
  //     }
  //   };

  //   getRecords();
  // }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <ChatGroup
          name="Colin Hale"
          lastMessage="This is the last message"
          color={colorsOfTheYear[0]}
          id="colin"
        />
        <ChatGroup
          name="Kevyn Hale"
          lastMessage="This is the last message This message is a bit longer then the others though"
          color={colorsOfTheYear[2]}
          id="kevyn"
        />
        <ChatGroup
          name="Tyson Hale"
          lastMessage="This is the last message"
          color={colorsOfTheYear[1]}
          id="tyson"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
