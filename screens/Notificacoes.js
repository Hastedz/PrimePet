import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function Notificacoes() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Notificações
      </Text>

      <Text style={styles.text}>
        Você não possui novas notificações.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    color: "#666",
  },
});
