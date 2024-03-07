import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { styles } from '../styles/mapsStyles';
import axios from 'axios';

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
  handleManualInput = async () => {
    // Clear previous markers
    this.setState({
      markers: [],
    });

    const enteredLat = parseFloat(this.state.latitudeInput); // Actualiza para usar el estado correcto
    const enteredLng = parseFloat(this.state.longitudeInput); // Actualiza para usar el estado correcto

    // Check if enteredLat and enteredLng are valid numbers
    if (!isNaN(enteredLat) && !isNaN(enteredLng)) {
      const newMarker = {
        lat: enteredLat,
        lng: enteredLng,
        color: 'blue', // You can set a different color for manually entered markers
      };

      // Update the markers state
      this.setState((prevState) => ({
        markers: [...prevState.markers, newMarker],
      }));

      this.updateCombinedCoordinates(newMarker.lat, newMarker.lng);

      // Make an API request with the entered coordinates using Axios
      try {
        const response = await axios.get(`http://127.0.0.1:8000/predictZone/${enteredLng}/${enteredLat}`);

        // Check if the response is successful
        if (response.status === 200) {
          const data = response.data;

          // Update the state with the API response
          this.setState({
            apiResponse: data,
          });

          // Update the marker position based on the prediction result
          const predictedMarker = {
            lat: parseFloat(data.latitud),
            lng: parseFloat(data.longitud),
          };

          // Add the new marker with the predicted coordinates
          this.setState((prevState) => ({
            markers: [
              ...prevState.markers,
              { ...newMarker, color: 'yellow' }, // Blue marker
              { ...predictedMarker, color: 'green' }, // Green marker
            ],
          }));

          this.updateCombinedCoordinates(predictedMarker.lat, predictedMarker.lng);

          // Assuming you have a reference to the map, you can use it to pan to the new marker
          // Note: React Native's MapView doesn't have a panTo method. You may need to use a different approach to handle this.
        } else {
          throw new Error('API request failed');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      alert('Please enter valid latitude and longitude values.');
    }
  };

  handleCalcularClick = async () => {
    // Get the last clicked coordinates
    const { lng, lat } = this.state.userClickedCoordinates;

    // Make an API request with the clicked coordinates using Axios
    try {
      const response = await axios.get(`http://127.0.0.1:8000/predictZone/${lng}/${lat}`);

      // Check if the response is successful
      if (response.status === 200) {
        const data = response.data;

        // Update the state with the API response
        this.setState({
          apiResponse: data,
        });

        // Update the marker position based on the prediction result
        const predictedMarker = {
          lat: parseFloat(data.latitud),
          lng: parseFloat(data.longitud),
        };

        // Add the new marker with the predicted coordinates
        this.setState((prevState) => ({
          markers: [
            ...prevState.markers,
            { ...predictedMarker, color: 'green' }, // Green marker
          ],
        }));

        this.updateCombinedCoordinates(predictedMarker.lat, predictedMarker.lng);

        // Note: React Native's MapView doesn't have a panTo method. You may need to use a different approach to handle this.
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
            <Text style={styles.inputLabel}>Latitud:</Text>
            <TextInput
              style={styles.input}
              value={this.state.latitudeInput}
              onChangeText={(text) => this.setState({ latitudeInput: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Longitud:</Text>
            <TextInput
              style={styles.input}
              value={this.state.longitudeInput}
              onChangeText={(text) => this.setState({ longitudeInput: text })}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={this.handleUpdateCoordinates}>
          <Text style={[styles.buttonText, { color: 'white' }]}>Actualizar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { color: 'white' }]} onPress={this.handleManualInput}>
            <Text style={[styles.buttonText, { color: 'white' }]}>Add Marker</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { color: 'white' }]} onPress={this.handleCalcularClick}>
            <Text style={[styles.buttonText, { color: 'white' }]}>Calcular</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}
