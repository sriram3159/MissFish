// firebaseConfig.js
import { initializeApp } from '@react-native-firebase/app';

// Your Firebase config from Firebase Console → Project Settings → "Config"
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'missfish-e4511',
  appId: '1:54054402983:android:fb4ba7b05f74d87db11482',
  messagingSenderId: '54054402983', // ← Important for FCM
};

// Initialize Firebase
if (!initializeApp().length) {
  initializeApp(firebaseConfig);
}

export default initializeApp();
