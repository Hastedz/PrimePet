import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../config/firebase";

export function cadastrar(email, senha) {
  return createUserWithEmailAndPassword(
    auth,
    email.trim(),
    senha
  );
}

export function login(email, senha) {
  return signInWithEmailAndPassword(
    auth,
    email.trim(),
    senha
  );
}

export function sair() {
  return signOut(auth);
}