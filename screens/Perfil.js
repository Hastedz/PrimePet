import {
  View,
  Text,
  StyleSheet,
  Button,
} from "react-native";

import { sair } from "../services/auth";

export default function Perfil({ usuario }) {
  async function fazerLogout() {
    try {
      await sair();
    } catch (error) {
      console.log("Erro ao sair:", error);
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        👤 Perfil
      </Text>

      <Text style={styles.label}>
        E-mail:
      </Text>

      <Text style={styles.email}>
        {usuario?.email || "Não informado"}
      </Text>

      <View style={styles.button}>
        <Button
          title=" Sair da conta"
          onPress={fazerLogout}
        />
      </View>

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
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },

  email: {
    fontSize: 16,
    marginBottom: 30,
  },

  button: {
    width: "80%",
  },
});