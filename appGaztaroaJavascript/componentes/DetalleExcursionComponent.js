import React, { Component } from 'react';
import { Card, Icon } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { COMENTARIOS } from '../comun/comentarios';

function RenderExcursion(props) {

    const excursion = props.excursion;

    if (excursion != null) {
        return (
            <Card>
                <Card.Image source={require('./imagenes/40Años.png')}>
                    <Card.FeaturedTitle
                        style={{
                            color: 'chocolate',
                            fontSize: 24,
                            fontWeight: 'bold',
                            textAlign: 'center', // Centrar el texto horizontalmente
                        }}
                    >
                        {excursion.nombre}
                    </Card.FeaturedTitle>
                </Card.Image>
                <Text style={{ margin: 20 }}>
                    {excursion.descripcion}
                </Text>
                <Icon
                    raised
                    reverse
                    name={props.favorita ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()} />
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

function RenderComentario(props) {
    const comentarios = props.comentarios;

    // Función para formatear la fecha
    const formatearFecha = (fechaISO) => {
        // Eliminar espacios alrededor de los dos puntos
        const fechaLimpia = fechaISO.replace(/\s*:\s*/g, ':');
        const fecha = new Date(fechaLimpia);
    
        // Verificar si la fecha es válida
        if (isNaN(fecha)) {
            return 'Fecha no válida';
        }
    
        return new Intl.DateTimeFormat('es-ES', {
            weekday: 'long', // Día de la semana
            year: 'numeric', // Año
            month: 'long', // Mes completo
            day: 'numeric', // Día del mes
            hour: '2-digit', // Hora
            minute: '2-digit', // Minutos
            second: '2-digit', // Segundos
        }).format(fecha);
    };

    return (
        <Card>
            <Card.Title>Comentarios</Card.Title>
            <Card.Divider />
            <View>
                {comentarios.map((comentario) => (
                    <View key={comentario.id} style={{ marginBottom: 10 }}>
                        {/* Comentario */}
                        <Text>{comentario.comentario}</Text>

                        {/* Valoración */}
                        <Text style={{ fontSize: 12 }}>
                            {comentario.valoracion} Stars
                        </Text>

                        {/* Autor y fecha con formato "-- autor, dia" */}
                        <Text style={{ fontSize: 12 }}>
                            -- {comentario.autor}, {formatearFecha(comentario.dia)}
                        </Text>
                    </View>
                ))}
            </View>
        </Card>
    );
}


class DetalleExcursion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES,
            comentarios: COMENTARIOS,
            favoritos: [],
        };
    }

    marcarFavorito(excursionId) {
        this.setState({ favoritos: this.state.favoritos.concat(excursionId) });
    }

    render() {
        const { excursionId } = this.props.route.params;
        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.state.excursiones[+excursionId]}
                    favorita={this.state.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                />
                <RenderComentario
                    comentarios={this.state.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                />
            </ScrollView>
        );
    }
}

export default DetalleExcursion;