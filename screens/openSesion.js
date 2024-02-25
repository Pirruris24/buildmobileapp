import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { height } = Dimensions.get('window');
const mapHeight = height * 0.7;

export default class GoogleMapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markerCoordinates: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
      latitudeInput: '',
      longitudeInput: '',
    };

    this.mapRef = null; // Almacena una referencia al componente MapView
  }

  handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    this.setState({
      markerCoordinates: coordinate,
    });
  }

  handleUpdateCoordinates = () => {
    const { latitudeInput, longitudeInput } = this.state;
    const latitude = parseFloat(latitudeInput);
    const longitude = parseFloat(longitudeInput);
    if (!isNaN(latitude) && !isNaN(longitude)) {
      this.setState({
        markerCoordinates: { latitude, longitude },
      });

      // Actualiza la región del mapa para centrarla en las nuevas coordenadas
      if (this.mapRef) {
        this.mapRef.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            ref={ref => { this.mapRef = ref; }} // Almacena la referencia al MapView
            style={[styles.map, { height: mapHeight }]}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={this.handleMapPress}
          >
            <Marker
              coordinate={this.state.markerCoordinates}
              title="Custom Marker"
            />
          </MapView>
        </View>
        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.input}
            placeholder="Latitude"
            value={this.state.latitudeInput}
            onChangeText={(text) => this.setState({ latitudeInput: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Longitude"
            value={this.state.longitudeInput}
            onChangeText={(text) => this.setState({ longitudeInput: text })}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleUpdateCoordinates}>
            <Text>Update Marker</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 10,
    borderRadius: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
