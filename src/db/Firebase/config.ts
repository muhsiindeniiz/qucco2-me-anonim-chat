import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';
import {getAuth} from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyDGKkBn4Sx9cK3vTvCix0-fRV1r5tzt_bc',
  authDomain: 'qucco2me-1a36e.firebaseapp.com',
  projectId: 'qucco2me-1a36e',
  storageBucket: 'qucco2me-1a36e.appspot.com',
  messagingSenderId: '168229865574',
  appId: '1:168229865574:web:eacdfdf3e25cbca75ec5a7',
  measurementId: 'G-THH0055Y80',
};
export const InitialFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    const analytics = firebase.analytics();
  }
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(firebaseApp);
