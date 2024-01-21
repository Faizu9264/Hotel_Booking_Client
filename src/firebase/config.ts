//firebase/confige.ts
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA0aQIxuJeof97hQLO6TAufxism7HebYR4",
    authDomain: "hotelroom-405612.firebaseapp.com",
    projectId: "hotelroom-405612",
    storageBucket: "hotelroom-405612.appspot.com",
    messagingSenderId: "964659247733",
    appId: "1:964659247733:web:fd64013da5102f1db5163c",
    measurementId: "G-JM2B3LEGW3"
};

export const app = initializeApp(firebaseConfig);

type FirebaseStorage = ReturnType<typeof getStorage>;
export const storage: FirebaseStorage = getStorage(app);