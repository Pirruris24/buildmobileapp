import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { styles } from '../styles/mapsStyles';

const { height } = Dimensions.get('window');
const mapHeight = height * 0.7;

export default class GoogleMapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markerCoordinates: {
        latitude: 20.6578,
        longitude: -103.3244,
      },
      latitudeInput: '20.6578', // Inicializa con la latitud actual limitada a 4 decimales
      longitudeInput: '-103.3244', // Inicializa con la longitud actual limitada a 4 decimales
    };

    this.mapRef = null; // Almacena una referencia al componente MapView
  }

  handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    this.setState({
      markerCoordinates: coordinate,
      latitudeInput: `${coordinate.latitude.toFixed(4)}`, // Limita la latitud a 4 decimales
      longitudeInput: `${coordinate.longitude.toFixed(4)}`, // Limita la longitud a 4 decimales
    }, () => {
      // Actualiza la región del mapa para centrarla en las nuevas coordenadas
      if (this.mapRef) {
        this.mapRef.animateToRegion({
          ...coordinate,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    });
  }

  handleUpdateCoordinates = () => {
    const { latitudeInput, longitudeInput } = this.state;
    const latitude = parseFloat(latitudeInput);
    const longitude = parseFloat(longitudeInput);
    if (!isNaN(latitude) && !isNaN(longitude)) {
      this.setState({
        markerCoordinates: { latitude, longitude },
      }, () => {
        // Actualiza la región del mapa para centrarla en las nuevas coordenadas
        if (this.mapRef) {
          this.mapRef.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }
      });
    }
  }

  render() {
    const { markerCoordinates } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            ref={ref => { this.mapRef = ref; }} // Almacena la referencia al MapView
            style={[styles.map, { height: mapHeight }]}
            initialRegion={{
              ...markerCoordinates,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={this.handleMapPress}
          >
            <Marker
              coordinate={markerCoordinates}
            />
          </MapView>
        </View>
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <Text>Latitud:</Text>
            <TextInput
              style={styles.input}
              value={this.state.latitudeInput}
              onChangeText={(text) => this.setState({ latitudeInput: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Longitud:</Text>
            <TextInput
              style={styles.input}
              value={this.state.longitudeInput}
              onChangeText={(text) => this.setState({ longitudeInput: text })}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={this.handleUpdateCoordinates}>
            <Text>Actualizar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
