/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-return-await */
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkRx5F037A0tz5F6mRTOw5gqZUmekBLBU",
  authDomain: "litmedia-2cf97.firebaseapp.com",
  projectId: "litmedia-2cf97",
  storageBucket: "litmedia-2cf97.appspot.com",
  messagingSenderId: "880858007710",
  appId: "1:880858007710:web:36b3dfb81ea1395eb6d38f",
  measurementId: "G-D8NMNEKRNB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file, type = 'image') {
  let folder = type === 'image' ? 'images' : 'pdfs';
  const storageRef = ref(storage, `${folder}/${uuidv4()}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}


