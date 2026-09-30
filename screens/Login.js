import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { entrar } from "../services/auth";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleLogin() {
    if (carregando) {
      return;
    }

    setErro("");

    if (!email.trim() || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    try {
      setCarregando(true);

      await entrar(email.trim(), senha);

    } catch (error) {
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setErro("E-mail ou senha incorretos.");
      } else if (error.code === "auth/invalid-email") {
        setErro("Digite um e-mail válido.");
      } else if (
        error.code === "auth/network-request-failed"
      ) {
        setErro("Verifique sua conexão com a internet.");
      } else {
        setErro("Não foi possível entrar.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Login
      </Text>

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
        onPress={handleLogin}
        disabled={carregando}
      >
        <Text style={styles.buttonText}>
          {carregando ? "Entrando..." : "Entrar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={carregando}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styles.link}>
          Não possui uma conta? Cadastre-se
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },

  error: {
    color: "#b00020",
    marginBottom: 15,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
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
  },
});