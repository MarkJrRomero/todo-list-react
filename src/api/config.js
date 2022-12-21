import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider} from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyACFD6-4eJc2hMHbj6QMfEOTTP2TpkfcaM",
    authDomain: "todo-list-89556.firebaseapp.com",
    projectId: "todo-list-89556",
    storageBucket: "todo-list-89556.appspot.com",
    messagingSenderId: "93517822512",
    appId: "1:93517822512:web:7845dd8f1bd5522cf44bf5"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {ref, uploadBytesResumable, getDownloadURL };

export const db = getFirestore();
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
const providerFacebook = new FacebookAuthProvider();

providerFacebook.setCustomParameters({
  'display': 'popup'
});

export const signInGoogle = async () => {
  await signInWithPopup(auth, provider).then((result) => {
    localStorage.setItem('resultUser', JSON.stringify(result))
  }).catch((error) => {
    localStorage.setItem('error', error)
  })
}

export const signInFacebook = async () => {
  await signInWithPopup(auth, providerFacebook).then((result) => {
    localStorage.setItem('resultUser', JSON.stringify(result))
  }).catch((error) => {
    localStorage.setItem('error', error)
  })
}

