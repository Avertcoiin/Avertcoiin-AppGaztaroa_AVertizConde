import React, { Component } from 'react';
import { View, Platform, StyleSheet, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from '@rneui/themed';

import Home from './HomeComponent';
import Contacto from './ContactoComponent';
import QuienesSomos from './QuienesSomosComponent';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';

import { colorGaztaroaClaro, colorGaztaroaOscuro } from '../comun/comun';

// Importa Redux
import { connect } from 'react-redux';
import { fetchExcursiones, fetchComentarios, fetchCabeceras, fetchActividades } from '../redux/ActionCreators';

// Mapea el estado de Redux a las props del componente
const mapStateToProps = (state) => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        cabeceras: state.cabeceras,
        actividades: state.actividades,
    };
};

// Mapea las acciones de Redux a las props del componente
const mapDispatchToProps = (dispatch) => ({
    fetchExcursiones: () => dispatch(fetchExcursiones()),
    fetchComentarios: () => dispatch(fetchComentarios()),
    fetchCabeceras: () => dispatch(fetchCabeceras()),
    fetchActividades: () => dispatch(fetchActividades()),
});

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: colorGaztaroaOscuro,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60,
    },
});

// Drawer
function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                <View style={styles.drawerHeader}>
                    <View style={{ flex: 1 }}>
                        <Image source={require('./imagenes/logo.png')} style={styles.drawerImage} />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.drawerHeaderText}> Gaztaroa</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </SafeAreaView>
        </DrawerContentScrollView>
    );
}

// StackNavigator: Home
function HomeNavegador() {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} options={{ title: 'Campo Base' }} />
        </Stack.Navigator>
    );
}

// StackNavigator: Quienes Somos
function QuienesSomosNavegador() {
    return (
        <Stack.Navigator initialRouteName="QuienesSomos" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="QuienesSomos" component={QuienesSomos} />
        </Stack.Navigator>
    );
}

// StackNavigator: Contacto
function ContactoNavegador() {
    return (
        <Stack.Navigator initialRouteName="Contacto" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Contacto" component={Contacto} options={{ title: 'Contacto' }} />
        </Stack.Navigator>
    );
}

// StackNavigator: Calendario y DetalleExcursion
function CalendarioNavegador() {
    return (
        <Stack.Navigator
            initialRouteName="Calendar"
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' },
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen
                name="Calendar"
                component={Calendario}
                options={({ navigation }) => ({
                    title: 'Calendario Gaztaroa',
                    headerLeft: () => (
                        <Icon
                            name="menu"
                            size={28}
                            color="white"
                            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                        />
                    ),
                })}
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
                            <Text style={{ color: '#fff', fontSize: 14 }}>Detalle Excursión</Text>
                        </View>
                    ),
                    headerStyle: { backgroundColor: colorGaztaroaOscuro },
                    headerTitleAlign: 'center',
                })}
            />
        </Stack.Navigator>
    );
}

// Drawer Navigator
function DrawerNavegador({ navigation }) {
    return (
        <Drawer.Navigator
            initialRouteName="Campo base"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: colorGaztaroaClaro,
                },
                gestureEnabled: true,
            }}
        >
            <Drawer.Screen
                name="Campo base"
                component={HomeNavegador}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: colorGaztaroaOscuro },
                    headerTitleStyle: { color: '#fff' },
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <Icon
                            name="menu"
                            size={28}
                            color="white"
                            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                            style={{ marginLeft: 10 }}
                        />
                    ),
                    drawerIcon: ({ tintColor }) => (
                        <Icon name="home" type="font-awesome" size={24} color={tintColor} />
                    ),
                })}
            />

            <Drawer.Screen
                name="Quiénes somos"
                component={QuienesSomosNavegador}
                options={{
                    headerShown: true,
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: colorGaztaroaOscuro },
                    headerTitleStyle: { color: '#fff' },
                    headerTitleAlign: 'center',
                    drawerIcon: ({ tintColor }) => (
                        <Icon name="info-circle" type="font-awesome" size={24} color={tintColor} />
                    ),
                }}
            />

            <Drawer.Screen
                name="Calendario"
                component={CalendarioNavegador}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon name="calendar" type="font-awesome" size={24} color={tintColor} />
                    ),
                }}
            />

            <Drawer.Screen
                name="Contacto"
                component={ContactoNavegador}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: colorGaztaroaOscuro },
                    headerTitleStyle: { color: '#fff' },
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <Icon
                            name="menu"
                            size={28}
                            color="white"
                            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                            style={{ marginLeft: 10 }}
                        />
                    ),
                    drawerIcon: ({ tintColor }) => (
                        <Icon name="address-card" type="font-awesome" size={24} color={tintColor} />
                    ),
                })}
            />
        </Drawer.Navigator>
    );
}

// Componente principal
class Campobase extends Component {
    componentDidMount() {
        this.props.fetchExcursiones();
        this.props.fetchComentarios();
        this.props.fetchCabeceras();
        this.props.fetchActividades();
    }

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

export default connect(mapStateToProps, mapDispatchToProps)(Campobase);