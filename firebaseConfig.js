// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDYR2eLGrv_H20YfrMhi6V_0mF_tk0HLck',
  authDomain: 'react-native-firebase-ch-28a63.firebaseapp.com',
  projectId: 'react-native-firebase-ch-28a63',
  storageBucket: 'react-native-firebase-ch-28a63.appspot.com',
  messagingSenderId: '976769389955',
  appId: '1:976769389955:web:c847bf861cceef540c12b6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore();

export const auth = getAuth(app);
