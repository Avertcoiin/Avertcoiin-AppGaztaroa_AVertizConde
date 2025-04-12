import React from 'react';
import { Text, ScrollView } from 'react-native';
import { Card } from '@rneui/themed';

function Contacto() {
  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <Card>
        <Card.Title>Información de contacto</Card.Title>
        <Card.Divider />
        <Text style={{ marginBottom: 10}}>
          Kaixo Mendizale!
        </Text>
        <Text style={{ marginBottom: 10}}>
          Si quieres participar en las salidas de montaña que organizamos o quieres hacerte soci@ de Gaztaroa, puedes contactar con nosotros a través de diferentes medios. Puedes llamarnos por teléfono los jueves de las semanas que hay salida (de 20:00 a 21:00). También puedes ponerte en contacto con nosotros escribiendo un correo electrónico, o utilizando la aplicación de esta página web. Y además puedes seguirnos en Facebook.
        </Text>
        <Text style={{ marginBottom: 10}}>
          Para lo que quieras, estamos a tu disposición!
        </Text>
        <Text style={{ marginBottom: 10}}>
          Tel: +34 948 277151
        </Text>
        <Text style={{ marginBottom: 10}}>
          Email: gaztaroa@gaztaroa.com
        </Text>
      </Card>
    </ScrollView>
  );
}

export default Contacto;