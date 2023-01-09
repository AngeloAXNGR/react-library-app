import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyACcPPYNYo4jvPQFRnM_dRR1JIQRfO6xx8",
  authDomain: "react-library-app-2ef01.firebaseapp.com",
  projectId: "react-library-app-2ef01",
  storageBucket: "react-library-app-2ef01.appspot.com",
  messagingSenderId: "247486400997",
  appId: "1:247486400997:web:24505e1612ecd41bcb070c",
  measurementId: "G-DL2WKXH3YT"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
