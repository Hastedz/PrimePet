import { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { sair } from "../services/auth";

export default function Home({ usuario }) {
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSair() {
    if (carregando) {
      return;
    }

    setErro("");

    try {
      setCarregando(true);

      await sair();

    } catch (error) {
      setErro(
        "Não foi possível sair. Tente novamente."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bem-vindo!
      </Text>

      <Text style={styles.email}>
        {usuario?.email || "Usuário"}
      </Text>

      {erro ? (
        <Text
          style={styles.error}
          accessibilityRole="alert"
        >
          {erro}
        </Text>
      ) : null}
   
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
    marginBottom: 20,
  },

  email: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
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
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
