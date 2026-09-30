import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function Perfil() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Perfil
      </Text>

      <Text style={styles.text}>
        Aqui ficarão os dados do seu perfil.
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
