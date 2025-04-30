import React, { Component } from 'react';
import { Card, Icon, Input } from '@rneui/themed';
import { View, Text, ScrollView, Modal } from 'react-native';
import { connect } from 'react-redux'; // Conexión a Redux
import { baseUrl, colorGaztaroaOscuro } from '../comun/comun';
import { postFavorito } from '../redux/ActionCreators'; // Importar la acción
import { Rating } from 'react-native-ratings'; // Importar el componente Rating
import { postComentario } from '../redux/ActionCreators';

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
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
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
                    <Icon
                        raised
                        reverse
                        name="pencil"
                        type="font-awesome"
                        color={colorGaztaroaOscuro}
                        onPress={props.modalLapiz}
                    />
                </View>
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
            autor: '',
            comentario: '',
            dia: '',
            showModal: false, // Ponemos el estado del modal a false por defecto
            valoracion: 5, // Ponemos el valor inicial 5 por defecto
        };
    }

    gestionarComentario(excursionId) {
        const { valoracion, autor, comentario } = this.state;

        // Genera la fecha actual
        const dia = new Date().toISOString();

        // Llama a la acción postComentario para enviar los datos al repositorio Redux
        this.props.postComentario(excursionId, valoracion, autor, comentario, dia);

        // Resetea el formulario y cierra el Modal
        this.resetForm();
        this.toggleModal();
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal }); //modalVisible, no showModal
    }

    resetForm() {
        this.setState({
            valoracion: 5, // Valoración inicial
            autor: '', // Campo de autor vacío
            comentario: '', // Campo de comentario vacío
            showModal: false,  // Cierra el modal. modalVisible, no showModal
        });
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

        // Filtrar los comentarios por excursionId
        const comentariosFiltrados = this.props.comentarios.comentarios.filter(
            (comentario) => comentario.excursionId === excursionId
        );

        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                    modalLapiz={() => this.toggleModal()} // toggleamos el Modal
                />
                <RenderComentario comentarios={comentariosFiltrados} />

                {/* Modal */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()} // Llama a toggleModal para cerrar el Modal
                >
                    <View style={{ marginTop: 20, flex: 1, alignItems: 'center' }}>
                        {/* Valor del Rating */}
                        <Text>
                            <Text>
                                <Text style={{ fontSize: 20, color: '#FFD700' }}>Rating: </Text>
                                <Text style={{ fontSize: 30, color: '#FFD700', fontWeight: 'bold' }}>{this.state.valoracion}</Text>
                                <Text style={{ fontSize: 20, color: '#FFD700' }}>/5</Text>
                            </Text>
                        </Text>

                        {/* Rating */}
                        <Rating style={{ marginTop: 10 }}
                            startingValue={5} // 5 estrellas seleccionadas por defecto 
                            onFinishRating={(rating) => this.setState({ valoracion: rating })} // Actualiza el estado con la nueva valoración                           
                        />

                        {/* Campo de Autor */}
                        <Input
                            placeholder="Autor"
                            leftIcon={{ type: 'font-awesome', name: 'user' }} // Icono de persona a la izda
                            onChangeText={(autor) => this.setState({ autor })} // Almacenamos en el estado
                        />

                        {/* Campo de Comentario */}
                        <Input
                            placeholder="Comentario"
                            leftIcon={{ type: 'font-awesome', name: 'comment' }} // Icono de bocadillo a la izda
                            onChangeText={(comentario) => this.setState({ comentario })} // Almacenamos en el estado
                            multiline={true} // Permite múltiples líneas en el comentario
                        />

                        {/* Botón de enviar */}
                        <Text
                            style={{
                                marginTop: 10,
                                color: colorGaztaroaOscuro,
                            }}
                            onPress={() => this.gestionarComentario(this.props.route.params.excursionId)}
                        >
                            ENVIAR
                        </Text>

                        {/* Botón de cancelar */}
                        <Text
                            style={{
                                marginTop: 20,
                                color: colorGaztaroaOscuro,
                            }}
                            onPress={() => {
                                this.resetForm()
                                this.toggleModal();
                            }} // Llama a toggleModal para cerrar el Modal
                        >
                            CANCELAR
                        </Text>

                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        excursiones: state.excursiones,
        favoritos: state.favoritos,
        comentarios: state.comentarios,
    };
};

const mapDispatchToProps = (dispatch) => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)), // Acción para manejar favoritos
    postComentario: (excursionId, valoracion, autor, comentario, dia) =>
        dispatch(postComentario(excursionId, valoracion, autor, comentario, dia)), // Acción para manejar comentarios
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);