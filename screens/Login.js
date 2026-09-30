// Os imports trazem as ferramentas usadas nesta tela: recursos do React,
// elementos visuais do React Native e nossa função de login.

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
  // useState guarda uma informação que pode mudar enquanto a tela está aberta.
  // Por exemplo, email é o texto atual e setEmail atualiza esse texto.
  // Também guardamos a senha, se estamos esperando uma resposta e algum erro.

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  // Esta função é chamada ao tocar em Entrar. Primeiro, evita outra tentativa
  // durante a espera e verifica se a pessoa preencheu os dois campos.

  async function handleLogin() {
    if (carregando) return;

    setErro("");

    if (!email.trim() || !senha) {
      setErro("Preencha o e-mail e a senha.");
      return;
    }

    // await espera a resposta do login. Se algo falhar, seguimos para catch.
    // finally encerra a espera em qualquer caso, liberando o botão novamente.

    try {
      setCarregando(true);

      await entrar(email, senha);
    } catch (error) {
      // Transformamos o código devolvido pelo Firebase em uma mensagem
      // que a pessoa consiga entender. Se o código não estiver nesta lista,
      // usamos a mensagem geral de falha logo abaixo.

      const mensagens = {
        "auth/invalid-email": "Digite um e-mail válido.",
        "auth/invalid-credential": "E-mail ou senha incorretos.",
        "auth/user-not-found": "E-mail ou senha incorretos.",
        "auth/wrong-password": "E-mail ou senha incorretos.",
        "auth/user-disabled": "Esta conta foi desativada.",
        "auth/too-many-requests":
          "Muitas tentativas. Tente novamente mais tarde.",
        "auth/network-request-failed":
          "Verifique sua conexão com a internet.",
      };

      setErro(
        mensagens[error.code] ||
          "Não foi possível entrar. Tente novamente."
      );
    } finally {
      setCarregando(false);
    }
  }

  // Esta parte descreve a tela: View agrupa o conteúdo, Text mostra textos,
  // TextInput cria campos e TouchableOpacity recebe o toque nos botões.

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Entrar
      </Text>

      {/* value mostra o e-mail guardado e onChangeText salva o que é digitado.
          As demais opções facilitam a digitação sem corrigir o endereço.
          No campo de senha, secureTextEntry esconde os caracteres na tela. */}

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        accessibilityLabel="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        accessibilityLabel="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        autoCapitalize="none"
      />

      {/* A mensagem aparece somente quando há algum erro para mostrar. */}

      {erro ? (
        <Text
          style={styles.error}
          accessibilityRole="alert"
        >
          {erro}
        </Text>
      ) : null}

      {/* onPress chama a função de login. Durante a espera, disabled bloqueia
          novos toques e o texto do botão muda para Entrando... */}

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

      {/* Este link abre o Cadastro para quem ainda não tem conta. */}

      <TouchableOpacity
        onPress={() => navigation.navigate("Cadastro")}
        disabled={carregando}
      >
        <Text style={styles.link}>
          Não possui uma conta? Cadastre-se
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// Os estilos definem a aparência do título, dos campos, do botão e do link.
// padding cria espaço interno, marginBottom separa os elementos e borderRadius
// arredonda os cantos. Cada elemento escolhe seu estilo usando styles.nome.

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
