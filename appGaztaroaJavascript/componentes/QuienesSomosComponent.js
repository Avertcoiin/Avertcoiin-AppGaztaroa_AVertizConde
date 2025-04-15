import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card, ListItem, Avatar } from '@rneui/themed';
import { ACTIVIDADES } from '../comun/actividades';
import { baseUrl } from '../comun/comun';

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
  constructor(props) {
    super(props);
    this.state = {
      actividades: ACTIVIDADES, // Asegúrate de que ACTIVIDADES esté correctamente importado
    };
  }

  render() {
    const renderActividadItem = ({ item }) => {
      return (
        <ListItem bottomDivider>
          <Avatar source={{ uri: baseUrl + item.imagen }} /> {/* Cambiado excursiones.imagen a item.imagen */}
          <ListItem.Content>
            <ListItem.Title>{item.nombre}</ListItem.Title>
            <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    };

    return (
      <ScrollView style={{ flex: 1, padding: 10 }}>
        {/* Card para "Quiénes somos" */}
        <Historia />

        {/* Card para "Actividades y recursos" */}
        <Card>
          <Card.Title>"Actividades y recursos"</Card.Title>
          <Card.Divider />
          {this.state.actividades.map((item) => (
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

export default QuienesSomos;