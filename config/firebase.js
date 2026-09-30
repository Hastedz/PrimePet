import { initializeApp } from "firebase/app";

import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABeXyaJ_5eX5-cgWiWGRVru0C2FQAv4yg",
  authDomain: "petshop-app-3atb.firebaseapp.com",
  projectId: "petshop-app-3atb",
  storageBucket: "petshop-app-3atb.firebasestorage.app",
  messagingSenderId: "1025054868757",
  appId: "1:1025054868757:web:5da66297eaa7adf958951c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Erro ao salvar sessão:", error);
  });
