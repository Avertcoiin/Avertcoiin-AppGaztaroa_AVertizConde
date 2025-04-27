import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from '@rneui/themed';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';

function RenderItem(props) {
    if (props.isLoading) {
        return <IndicadorActividad />;
    } else if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    } else {
        const item = props.item;

        if (item != null) {
            return (
                <Card>
                    <Card.Image source={{ uri: baseUrl + item.imagen }}>
                        <Card.FeaturedTitle
                            style={{
                                color: 'chocolate',
                                fontSize: 24,
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}
                        >
                            {item.nombre}
                        </Card.FeaturedTitle>
                    </Card.Image>
                    <Card.Divider />
                    <Text style={{ margin: 20 }}>{item.descripcion}</Text>
                </Card>
            );
        } else {
            return <View></View>;
        }
    }
}

class Home extends Component {
    render() {
        return (
            <ScrollView>
                <RenderItem
                    item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]}
                    isLoading={this.props.cabeceras.isLoading}
                    errMess={this.props.cabeceras.errMess}
                />
                <RenderItem
                    item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]}
                    isLoading={this.props.excursiones.isLoading}
                    errMess={this.props.excursiones.errMess}
                />
                <RenderItem
                    item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]}
                    isLoading={this.props.actividades.isLoading}
                    errMess={this.props.actividades.errMess}
                />
            </ScrollView>
        );
    }
}

// Mapeamos el estado de Redux a las props del component
const mapStateToProps = (state) => {
    return {
        excursiones: state.excursiones,
        cabeceras: state.cabeceras,
        actividades: state.actividades,
    };
};

// Conectamos el componente con Redux
export default connect(mapStateToProps)(Home);