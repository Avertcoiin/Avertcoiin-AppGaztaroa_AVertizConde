import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Calendario from './CalendarioComponent';
import { EXCURSIONES } from '../comun/excursiones';

class Campobase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES
    };
  }

  render() {
    return (
      <View style={{ marginTop: 20 }}> {/* Ajustamos el margen superior */}
        <Calendario excursiones={this.state.excursiones} />
      </View>
    );
  }
}

export default Campobase;