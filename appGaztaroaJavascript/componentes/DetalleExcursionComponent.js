import React, { Component } from 'react';
import { Card, Icon } from '@rneui/themed';
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux'; // Conexión a Redux
import { baseUrl } from '../comun/comun';
import { postFavorito } from '../redux/ActionCreators'; // Importar la acción

function RenderExcursion(props) {
    const excursion = props.excursion;

    if (excursion != null) {
        return (
            <Card>
                <Card.Image source={{ uri: baseUrl + excursion.imagen }}>
                    <Card.FeaturedTitle
                        style={{
                            color: 'white',
                            fontSize: 24,
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                    >
                        {excursion.nombre}
                    </Card.FeaturedTitle>
                </Card.Image>
                <Text style={{ margin: 20 }}>{excursion.descripcion}</Text>
                <Icon
                    raised
                    reverse
                    name={props.favorita ? 'heart' : 'heart-o'}
                    type="font-awesome"
                    color="#f50"
                    onPress={() =>
                        props.favorita
                            ? console.log('La excursión ya se encuentra entre las favoritas')
                            : props.onPress()
                    }
                />
            </Card>
        );
    } else {
        return <View></View>;
    }
}

function RenderComentario(props) {
    const comentarios = props.comentarios;

    return (
        <Card>
            <Card.Title>Comentarios</Card.Title>
            <Card.Divider />
            <View>
                {comentarios.map((comentario) => (
                    <View key={comentario.id} style={{ marginBottom: 10 }}>
                        <Text>{comentario.comentario}</Text>
                        <Text style={{ fontSize: 12 }}>{comentario.valoracion} Stars</Text>
                        <Text style={{ fontSize: 12 }}>
                            -- {comentario.autor}, {new Date(comentario.dia).toLocaleDateString()}
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
            excursion: null,
            comentarios: [],
        };
    }

    componentDidMount() {
        const { excursionId } = this.props.route.params;

        // Obtener la excursión
        fetch(baseUrl + 'excursiones/' + excursionId)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error ' + response.status);
                }
            })
            .then((excursion) => this.setState({ excursion }))
            .catch((error) => console.error(error));

        // Obtener los comentarios
        fetch(baseUrl + 'comentarios?excursionId=' + excursionId)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error ' + response.status);
                }
            })
            .then((comentarios) => this.setState({ comentarios }))
            .catch((error) => console.error(error));
    }

    marcarFavorito(excursionId) {
        this.props.postFavorito(excursionId); // Conexión a Redux para manejar favoritos
    }

    render() {
        const { excursionId } = this.props.route.params;

        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                />
                <RenderComentario comentarios={this.state.comentarios} />
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        excursiones: state.excursiones,
        favoritos: state.favoritos, 
    };
};

const mapDispatchToProps = (dispatch) => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)), // Acción para manejar favoritos
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);