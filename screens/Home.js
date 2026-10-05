import { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";

import { enviarNotificacao } from "../services/notifications";
import { adicionarNotificacao } from "../services/notificationStore";

export default function Home({ usuario }) {
  const [erro, setErro] = useState("");

  async function agendarBanho() {
    try {
      setErro("");

      const titulo = "🛁 Banho agendado";
      const mensagem =
        "Seu pet tem um banho agendado para amanhã!";

      await enviarNotificacao(titulo, mensagem);

      adicionarNotificacao(titulo, mensagem);
    } catch (error) {
      console.log(error);
      setErro("Não foi possível enviar a notificação.");
    }
  }

  async function agendarTosa() {
    try {
      setErro("");

      const titulo = "✂️ Tosa agendada";
      const mensagem =
        "A tosa do seu pet foi agendada com sucesso!";

      await enviarNotificacao(titulo, mensagem);

      adicionarNotificacao(titulo, mensagem);
    } catch (error) {
      console.log(error);
      setErro("Não foi possível enviar a notificação.");
    }
  }

  async function agendarConsulta() {
    try {
      setErro("");

      const titulo = "🩺 Consulta agendada";
      const mensagem =
        "Sua consulta veterinária foi agendada com sucesso!";

      await enviarNotificacao(titulo, mensagem);

      adicionarNotificacao(titulo, mensagem);
    } catch (error) {
      console.log(error);
      setErro("Não foi possível enviar a notificação.");
    }
  }

  function comprarProdutos() {
    setErro(
      "🛍️ Produtos: em breve você poderá conferir nossos produtos para seu pet!"
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>
        🐶 PrimePet
      </Text>

      <Text style={styles.welcome}>
        Bem-vindo!
      </Text>

      <Text style={styles.email}>
        {usuario?.email || "Usuário"}
      </Text>

      <Text style={styles.subtitle}>
        O que você deseja fazer?
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="🛁 Agende seu banho"
          onPress={agendarBanho}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="✂️ Agende sua tosa"
          onPress={agendarTosa}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="🩺 Agende sua consulta"
          onPress={agendarConsulta}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="🛍️ Compre nossos produtos"
          onPress={comprarProdutos}
        />
      </View>

      {erro ? (
        <Text style={styles.error}>
          {erro}
        </Text>
      ) : null}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  email: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  buttonContainer: {
    marginTop: 8,
    marginBottom: 8,
  },

  error: {
    color: "#b00020",
    marginTop: 20,
    textAlign: "center",
  },
});