// Aqui ficam as chamadas ao Firebase. As telas usam estas funções para
// criar uma conta, entrar e sair, sem precisar repetir essas chamadas.

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Reaproveitamos a conexão preparada em config/firebase.js.
import { auth } from "../config/firebase";

// Cria a conta e já conecta o usuário. trim() remove espaços antes e depois
// do e-mail; a senha é mantida como foi digitada.
export function cadastrar(email, senha) {
  return createUserWithEmailAndPassword(auth, email.trim(), senha);
}

// Pede ao Firebase para conferir o e-mail e a senha de uma conta existente.
// O return permite que a tela aguarde o resultado e saiba se houve um erro.
export function entrar(email, senha) {
  return signInWithEmailAndPassword(auth, email.trim(), senha);
}

// Encerra a sessão atual, sem apagar a conta.
export function sair() {
  return signOut(auth);
}
