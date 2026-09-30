import { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { sair } from "../services/auth";

// O Navigator entrega os dados da pessoa conectada em usuario.
// Usamos o e-mail para mostrar qual conta está aberta.

export default function Home({ usuario }) {
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  // Ao tocar em Sair, pedimos ao Firebase para encerrar a sessão.
  // O Navigator percebe a mudança e volta a mostrar o Login.
  // Se a saída falhar, a pessoa continua nesta tela e recebe uma mensagem.

  async function handleSair() {
    if (carregando) return;

    setErro("");

    try {
      setCarregando(true);

      await sair();
    } catch {
      setErro("Não foi possível sair. Tente novamente.");
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
        {usuario.email}
      </Text>

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
        onPress={handleSair}
        disabled={carregando}
      >
        <Text style={styles.buttonText}>
          {carregando ? "Saindo..." : "Sair"}
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
