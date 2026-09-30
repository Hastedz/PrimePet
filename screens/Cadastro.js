import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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
      <Text style={styles.title}>
        Criar conta
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
