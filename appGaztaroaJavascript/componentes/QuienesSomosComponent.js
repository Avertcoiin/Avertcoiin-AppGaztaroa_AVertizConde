import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card, ListItem, Avatar } from '@rneui/themed';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';

// Componente funcional para la Card superior
function Historia() {
  return (
    <Card>
      <Card.Title>Un poquito de historia</Card.Title>
      <Card.Divider />
      <Text style={{ marginBottom: 10 }}>
        El nacimiento del club de montaña Gaztaroa se remonta a la primavera de 1976 cuando jóvenes aficionados a la montaña y pertenecientes a un club juvenil decidieron crear la sección montañera de dicho club. Fueron unos comienzos duros debido sobre todo a la situación política de entonces. Gracias al esfuerzo económico de sus socios y socias se logró alquilar una bajera. Gaztaroa ya tenía su sede social.
      </Text>
      <Text style={{ marginBottom: 10 }}>
        Desde aquí queremos hacer llegar nuestro agradecimiento a todos los montañeros y montañeras que alguna vez habéis pasado por el club aportando vuestro granito de arena.
      </Text>
      <Text>Gracias!</Text>
    </Card>
  );
}

// Componente de clase para la Card inferior
class QuienesSomos extends Component {
  render() {
    if (this.props.actividades.isLoading) {
      return (
        <ScrollView style={{ flex: 1, padding: 10 }}>
          {/* Card para "Quiénes somos" */}
          <Historia />

          {/* Indicador de actividad dentro de un Card */}
          <Card>
            <Card.Title>Actividades y recursos</Card.Title>
            <Card.Divider />
            <IndicadorActividad />
          </Card>
        </ScrollView>
      );
    } else if (this.props.actividades.errMess) {
      return (
        <ScrollView style={{ flex: 1, padding: 10 }}>
          {/* Card para "Quiénes somos" */}
          <Historia />

          {/* Mensaje de error dentro de un Card */}
          <Card>
            <Card.Title>Actividades y recursos</Card.Title>
            <Card.Divider />
            <Text>{this.props.actividades.errMess}</Text>
          </Card>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={{ flex: 1, padding: 10 }}>
          {/* Card para "Quiénes somos" */}
          <Historia />

          {/* Card para "Actividades y recursos" */}
          <Card>
            <Card.Title>Actividades y recursos</Card.Title>
            <Card.Divider />
            {this.props.actividades.actividades.map((item) => (
              <ListItem key={item.id} bottomDivider>
                <Avatar source={{ uri: baseUrl + item.imagen }} />
                <ListItem.Content>
                  <ListItem.Title>{item.nombre}</ListItem.Title>
                  <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </Card>
        </ScrollView>
      );
    }
  }
}

// Mapea el estado de Redux a las props del componente
const mapStateToProps = (state) => {
  return {
    actividades: state.actividades,
  };
};

// Conecta el componente con Redux
export default connect(mapStateToProps)(QuienesSomos);
