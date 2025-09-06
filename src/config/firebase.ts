import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBOvoX7cggOQIJZGkBoQuI5sAJqf-hv9hA",
  authDomain: "touten1-84a2e.firebaseapp.com",
  projectId: "touten1-84a2e",
  storageBucket: "touten1-84a2e.appspot.com",
  messagingSenderId: "646343603379",
  appId: "1:646343603379:web:3914df9a94b0e67f072cc6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;