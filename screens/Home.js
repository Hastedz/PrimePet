
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
  const [mensagem, setMensagem] = useState("");

  async function agendarBanho() {
    try {
      setErro("");
      setMensagem("");

      const titulo = "🛁 Banho agendado";
      const texto = "Seu pet tem um banho agendado para amanhã!";

      await enviarNotificacao(titulo, texto);
      adicionarNotificacao(titulo, texto);

      setMensagem(texto);
    } catch (error) {
      console.log(error);
      setErro("Não foi possível enviar a notificação.");
    }
  }

  async function agendarTosa() {
    try {
      setErro("");
      setMensagem("");

      const titulo = "✂️ Tosa agendada";
      const texto = "A tosa do seu pet foi agendada com sucesso!";

      await enviarNotificacao(titulo, texto);
      adicionarNotificacao(titulo, texto);

      setMensagem(texto);
    } catch (error) {
      console.log(error);
      setErro("Não foi possível enviar a notificação.");
    }
  }

  async function agendarConsulta() {
    try {
      setErro("");
      setMensagem("");

      const titulo = "🩺 Consulta agendada";
      const texto =
        "Sua consulta veterinária foi agendada com sucesso!";

      await enviarNotificacao(titulo, texto);
      adicionarNotificacao(titulo, texto);

      setMensagem(texto);
    } catch (error) {
      console.log(error);
      setErro("Não foi possível enviar a notificação.");
    }
  }

  function comprarProdutos() {
    setErro("");
    setMensagem(
      "🛍️ Em breve você poderá conferir nossos produtos para seu pet!"
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* LOGO / NOME */}
      <View style={styles.linha}>
        <Text style={styles.texto1}>
          🐾 Pet
        </Text>

        <Text style={styles.texto2}>
          Care
        </Text>
      </View>

      <Text style={styles.welcome}>
        Bem-vindo!
      </Text>

      <Text style={styles.email}>
        {usuario?.email || "Usuário"}
      </Text>

      <Text style={styles.subtitle}>
        O que você deseja fazer?
      </Text>

      {/* BOTÕES */}
      <View style={styles.botoes}>

        <View style={styles.botao}>
          <Button
            title="🛁 Agende seu banho"
            onPress={agendarBanho}
          />
        </View>

        <View style={styles.botao}>
          <Button
            title="✂️ Agende sua tosa"
            onPress={agendarTosa}
          />
        </View>

        <View style={styles.botao}>
          <Button
            title="🩺 Agende sua consulta"
            onPress={agendarConsulta}
          />
        </View>

        <View style={styles.botao}>
          <Button
            title="🛍️ Compre nossos produtos"
            onPress={comprarProdutos}
          />
        </View>

      </View>

      {/* MENSAGEM DE SUCESSO */}
      {mensagem ? (
        <Text style={styles.mensagem}>
          {mensagem}
        </Text>
      ) : null}

      {/* MENSAGEM DE ERRO */}
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
  padding: 20,
  alignItems: "center",
},

 linha: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 80,
},

  texto1: {
    fontSize: 25,
      fontWeight: "bold",
    color: "blue",
  },

  texto2: {
    fontSize: 25,
    fontWeight: "bold",
    color: "green",
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

  botoes: {
    width: 320,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },

  botao: {
    width: 150,
    height: 50,
    marginVertical: 5,
  },

  mensagem: {
    marginTop: 20,
    color: "green",
    fontSize: 16,
    textAlign: "center",
    maxWidth: 320,
  },

  error: {
    marginTop: 20,
    color: "#b00020",
    fontSize: 16,
    textAlign: "center",
    maxWidth: 320,
  },
});
