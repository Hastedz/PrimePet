import { useEffect, useState } from "react";

import { ActivityIndicator, StyleSheet, View } from "react-native";


import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import Login from "../screens/Login";
import Cadastro from "../screens/Cadastro";
import Home from "../screens/Home";

// Reunimos aqui as telas entre as quais o aplicativo pode navegar.
const Stack = createNativeStackNavigator();

export default function Navigator() {

// Ao abrir o aplicativo, ainda não sabemos se alguém está conectado.
// Guardamos a resposta do Firebase em usuario e mostramos uma espera até ela chegar.

const [usuario, setUsuario] = useState(null);
const [carregando, setCarregando] = useState(true);


// Começamos a acompanhar a sessão. O Firebase nos avisa quando alguém
// entra ou sai, e atualizamos a tela com essa informação. O [] evita
// começar outro acompanhamento a cada atualização da interface.

useEffect(() => {

    const cancelarObservacao = onAuthStateChanged(auth, (usuarioAtual) => {

    setUsuario(usuarioAtual);
    setCarregando(false);

});

// Paramos de receber os avisos quando este componente deixa de ser usado.
return cancelarObservacao;

}, []);


// Enquanto aguardamos a primeira resposta, mostramos apenas o indicador de espera.
if (carregando) {
    return (

     <View style={styles.loading}>
        <ActivityIndicator size="large" color="#007AFF" />
    </View>

    );
}


return (
// Se há alguém conectado, mostramos Home e entregamos os dados do usuário.
// Caso contrário, oferecemos Login e Cadastro. Os nomes destas telas
// são usados pelos links que chamam navigation.navigate.

<NavigationContainer>
    <Stack.Navigator>   
    {usuario ? (
        <Stack.Screen name="Home" options={{ title: "Início" }}>
            {() => <Home usuario={usuario} />}  
        </Stack.Screen>

    ) : (
                 <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Cadastro" component={Cadastro} />
                </>
            )}
            </Stack.Navigator>
        </NavigationContainer>

    );

}


const styles = StyleSheet.create({
loading: { flex: 1, justifyContent: "center", alignItems: "center" },
})