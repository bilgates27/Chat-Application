import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBAVQLqA6Gpuj8sguwySfka8AobCpXfkk",
  authDomain: "chat-application-bcc80.firebaseapp.com",
  projectId: "chat-application-bcc80",
  storageBucket: "chat-application-bcc80.appspot.com",
  messagingSenderId: "446595371278",
  appId: "1:446595371278:web:824df7687964beda92c75f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
