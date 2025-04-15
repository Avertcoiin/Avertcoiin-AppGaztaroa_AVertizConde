import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from '@rneui/themed';
import { baseUrl } from '../comun/comun';

function RenderItem(props) {
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

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excursiones: [],
            cabeceras: [],
            actividades: [],
        };

        // Cargar datos desde la base de datos
        Promise.all([
            fetch(baseUrl + 'excursiones').then((response) => {
                if (response.ok) return response.json();
                else throw new Error('Error ' + response.status);
            }),
            fetch(baseUrl + 'cabeceras').then((response) => {
                if (response.ok) return response.json();
                else throw new Error('Error ' + response.status);
            }),
            fetch(baseUrl + 'actividades').then((response) => {
                if (response.ok) return response.json();
                else throw new Error('Error ' + response.status);
            }),
        ])
            .then(([excursiones, cabeceras, actividades]) => {
                this.setState({ excursiones, cabeceras, actividades });
            })
            .catch((error) => console.error(error));
    }

    render() {
        return (
            <ScrollView>
                <RenderItem
                    item={this.state.cabeceras.filter((cabecera) => cabecera.destacado)[0]}
                />
                <RenderItem
                    item={this.state.excursiones.filter((excursion) => excursion.destacado)[0]}
                />
                <RenderItem
                    item={this.state.actividades.filter((actividad) => actividad.destacado)[0]}
                />
            </ScrollView>
        );
    }
}

export default Home;