import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import {
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../config/firebase";

import Login from "../screens/Login";
import Cadastro from "../screens/Cadastro";
import MainTabs from "./MainTabs";

const Stack = createNativeStackNavigator();

export default function Navigator() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const cancelarObservacao = onAuthStateChanged(
      auth,
      (usuarioAtual) => {
        setUsuario(usuarioAtual);
        setCarregando(false);
      }
    );

    return cancelarObservacao;
  }, []);

  if (carregando) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color="#007AFF"
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {usuario ? (
          <Stack.Screen
            name="Principal"
            options={{
              headerShown: false,
            }}
          >
            {() => (
              <MainTabs usuario={usuario} />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: "Login",
              }}
            />

            <Stack.Screen
              name="Cadastro"
              component={Cadastro}
              options={{
                title: "Criar conta",
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
