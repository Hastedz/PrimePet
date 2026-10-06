
import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import { cadastrar } from "../services/auth";

export default function Cadastro({ navigation }) {
  const [erro, setErro] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleCadastro() {
    if (carregando) {
      return;
    }

    setErro("");

    if (!email.trim() || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não são iguais.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setCarregando(true);

      await cadastrar(email.trim(), senha);

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErro("Este e-mail já está cadastrado.");
      } else if (error.code === "auth/invalid-email") {
        setErro("Digite um e-mail válido.");
      } else if (error.code === "auth/weak-password") {
        setErro("A senha é muito fraca.");
      } else if (
        error.code === "auth/network-request-failed"
      ) {
        setErro("Verifique sua conexão com a internet.");
      } else {
        setErro("Não foi possível criar a conta.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>

  <Image
    source={require("../assets/primepet-logo.png")}
    style={styles.logo}
  />

  <TextInput
    style={styles.input}
    placeholder="E-mail"
    value={email}
    onChangeText={setEmail}
    keyboardType="email-address"
    autoCapitalize="none"
    autoCorrect={false}
  />

  <TextInput
    style={styles.input}
    placeholder="Senha"
    value={senha}
    onChangeText={setSenha}
    secureTextEntry
  />

  <TextInput
    style={styles.input}
    placeholder="Confirmar senha"
    value={confirmarSenha}
    onChangeText={setConfirmarSenha}
    secureTextEntry
  />

  

      {erro ? (
        <Text
          style={styles.error}
          accessibilityRole="alert"
        >
          {erro}
        </Text>
      ) : null}

      <TouchableOpacity
        style={[
          styles.button,
          carregando && styles.buttonDisabled,
        ]}
        onPress={handleCadastro}
        disabled={carregando}
      >
        <Text style={styles.buttonText}>
          {carregando ? "Criando..." : "Criar conta"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={carregando}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.link}>
          Já possui uma conta? Faça login
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: ''
  },

  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginBottom: 30,
  },

  input: {
    width: "85%",
    maxWidth: 380,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    alignSelf: "center",
  },

  error: {
    color: "#b00020",
    marginBottom: 15,
    textAlign: "center",
    width: "85%",
    maxWidth: 380,
    alignSelf: "center",
  },

  button: {
    width: "85%",
    maxWidth: 380,
    backgroundColor: "#007AFF",
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    alignSelf: "center",
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  link: {
    color: "#007AFF",
    textAlign: "center",
    fontSize: 15,
    width: "85%",
    maxWidth: 380,
    alignSelf: "center",
  },
});
