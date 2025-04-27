import React, { Component } from 'react';
import { ListItem, Avatar } from '@rneui/themed';
import { SafeAreaView, FlatList, View, Text } from 'react-native';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';

class Calendario extends Component {
    render() {
        const { navigate } = this.props.navigation;

        const renderCalendarioItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
                    bottomDivider
                >
                    <Avatar source={{ uri: baseUrl + item.imagen }} />
                    <ListItem.Content>
                        <ListItem.Title>{item.nombre}</ListItem.Title>
                        <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        };

        // Verificamos si los datos están cargándose
        if (this.props.excursiones.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <IndicadorActividad />
                </View>
            );
        }

        // Verificamos si hay un error al cargar los datos
        if (this.props.excursiones.errMess) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{this.props.excursiones.errMess}</Text>
                </View>
            );
        }

        // Renderizamos el FlatList solo si los datos están cargados
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={this.props.excursiones.excursiones || []}
                    renderItem={renderCalendarioItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        excursiones: state.excursiones,
    };
};

export default connect(mapStateToProps)(Calendario);