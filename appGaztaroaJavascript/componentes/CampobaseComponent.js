import React, { Component } from 'react';
import Constants from 'expo-constants';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { Platform, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './HomeComponent';
import Contacto from './ContactoComponent';
import QuienesSomos from './QuienesSomosComponent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// StackNavigator para la pantalla "Calendario" y "DetalleExcursion"
function CalendarioNavegador() {
  return (
    <Stack.Navigator
      initialRouteName="Calendar"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff' },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Calendar"
        component={Calendario}
        options={{
          title: 'Calendario Gaztaroa', // Título de la pantalla principal
        }}
      />
      <Stack.Screen
        name="DetalleExcursion"
        component={DetalleExcursion}
        options={({ navigation }) => ({
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                onPress={() => navigation.goBack()}
                style={{
                  color: '#fff',
                  textDecorationLine: 'underline',
                  fontSize: 18,
                  marginRight: 10,
                }}
              >
                Calendario Gaztaroa
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 14,
                }}
              >
                Detalle Excursión
              </Text>
            </View>
          ),
          headerStyle: { backgroundColor: '#015afc' },
          headerTitleAlign: 'center',
        })}
      />

    </Stack.Navigator>
  );
}

// StackNavigator para la pantalla "Home"
function HomeNavegador() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headMode: 'screen',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff' },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Campo Base',
        }}
      />
    </Stack.Navigator>
  );
}

// StackNavigator para la pantalla "Quiénes somos"
function QuienesSomosNavegador() {
  return (
    <Stack.Navigator
      initialRouteName="QuienesSomos"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff' },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="QuienesSomos"
        component={QuienesSomos}
        options={{
          title: 'Quiénes somos', // Título del encabezado
        }}
      />
    </Stack.Navigator>
  );
}

// StackNavigator para la pantalla "Contacto"
function ContactoNavegador() {
  return (
    <Stack.Navigator
      initialRouteName="Contacto"
      screenOptions={{
        headerTintColor: '#fff', // Color del texto del encabezado
        headerStyle: { backgroundColor: '#015afc' }, // Color de fondo del encabezado
        headerTitleStyle: { color: '#fff' }, // Color del título
        headerTitleAlign: 'center', // Alinear el título al centro
      }}
    >
      <Stack.Screen
        name="Contacto"
        component={Contacto}
        options={{
          title: 'Contacto', // Título del encabezado
        }}
      />
    </Stack.Navigator>
  );
}

// DrawerNavigator que contiene los StackNavigators
function DrawerNavegador() {
  return (
    <Drawer.Navigator
      initialRouteName="Campo base"
      screenOptions={{
        headerShown: false, // Ocultar encabezado del DrawerNavigator
        drawerStyle: { backgroundColor: '#c2d3da' },
      }}
    >
      <Drawer.Screen
        name="Campo base"
        component={HomeNavegador}
      />
      <Drawer.Screen
        name="Quiénes somos"
        component={QuienesSomosNavegador} // Nuevo componente
      />
      <Drawer.Screen
        name="Calendario"
        component={CalendarioNavegador}
      />
      <Drawer.Screen
        name="Contacto"
        component={ContactoNavegador}
      />
    </Drawer.Navigator>
  );
}

// Componente principal que envuelve todo en un único NavigationContainer
class Campobase extends Component {
  render() {
    return (
      <NavigationContainer>
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
          <DrawerNavegador />
        </View>
      </NavigationContainer>
    );
  }
}

export default Campobase;
