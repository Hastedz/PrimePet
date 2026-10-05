import { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import {
  obterNotificacoes,
  observarNotificacoes,
} from "../services/notificationStore";

export default function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);

  useEffect(() => {
    setNotificacoes(obterNotificacoes());

    const cancelar = observarNotificacoes((lista) => {
      setNotificacoes([...lista]);
    });

    return cancelar;
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>
        🔔 Notificações
      </Text>

      {notificacoes.length === 0 ? (
        <Text style={styles.text}>
          Você não possui novas notificações.
        </Text>
      ) : (
        notificacoes.map((notificacao) => (
          <View
            key={notificacao.id}
            style={styles.card}
          >
            <Text style={styles.cardTitle}>
              {notificacao.titulo}
            </Text>

            <Text style={styles.message}>
              {notificacao.mensagem}
            </Text>

            <Text style={styles.date}>
              {notificacao.data}
            </Text>
          </View>
        ))
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },

  text: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },

  card: {
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },

  message: {
    fontSize: 15,
    marginBottom: 8,
  },

  date: {
    fontSize: 12,
    color: "#777",
  },
});