import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import Notificacoes from "../screens/Notificacoes";
import Perfil from "../screens/Perfil";

const Tab = createBottomTabNavigator();

export default function MainTabs({ usuario }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#888",

        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 5,
        },

        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          title: "Início",
        }}
      >
        {() => <Home usuario={usuario} />}
      </Tab.Screen>

      <Tab.Screen
        name="Notificacoes"
        component={Notificacoes}
        options={{
          title: "Notificações",
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          title: "Perfil",
        }}
      />
    </Tab.Navigator>
  );
}
