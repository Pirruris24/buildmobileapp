import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      apiResponse: null,
      storedData: null,
      activeMarker: {}, 
      selectedPlace: {},
      userClickedCoordinates: { latitude: 0, longitude: 0 },
      combinedCoordinates: '',
      enteredLat: '',
      enteredLng: '',
    };
  }

  updateCombinedCoordinates = (lat, lng) => {
    const newCombinedCoordinates = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    this.setState({
      combinedCoordinates: newCombinedCoordinates,
    });
  };

  onMapClick = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const newMarker = {
      latitude,
      longitude,
    };

    this.setState({
      markers: [newMarker],
      activeMarker: null,
      userClickedCoordinates: newMarker,
    });

    this.updateCombinedCoordinates(newMarker.latitude, newMarker.longitude);
  };

  handleManualInput = async () => {
    this.setState({
      markers: [],
    });

    const enteredLat = parseFloat(this.state.enteredLat);
    const enteredLng = parseFloat(this.state.enteredLng);

    if (!isNaN(enteredLat) && !isNaN(enteredLng)) {
      const newMarker = {
        latitude: enteredLat,
        longitude: enteredLng,
      };

      this.setState((prevState) => ({
        markers: [...prevState.markers, newMarker],
      }));

      this.updateCombinedCoordinates(newMarker.latitude, newMarker.longitude);
    } else {
      alert('Please enter valid latitude and longitude values.');
    }
  };

  handleCalcularClick = async () => {
    const { longitude, latitude } = this.state.userClickedCoordinates;

    const predictedMarker = await this.makeAPIRequest(longitude, latitude);

    this.setState((prevState) => ({
      markers: [
        ...prevState.markers,
        { ...predictedMarker, color: 'green' },
      ],
    }));

    this.updateCombinedCoordinates(predictedMarker.latitude, predictedMarker.longitude);
  };

  makeAPIRequest = async (lng, lat) => {
    // Make your API request here
    // Example:
    /*
    const response = await fetch(
      `http://127.0.0.1:8000/predictZone/${lng}/${lat}`
    );

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return {
      latitude: parseFloat(data.latitud),
      longitude: parseFloat(data.longitud),
    };
    */
  };

  onMarkerClick = (marker) => {
    this.setState({
      activeMarker: marker,
      selectedPlace: marker,
    });
  };

  handleInputChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* Display the API response */}
        {this.state.apiResponse && (
          <View>
            <Text>API Response:</Text>
            <Text>{JSON.stringify(this.state.apiResponse)}</Text>
          </View>
        )}

        <View>
          <Text>Combined Coordinates:</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }}
            value={this.state.combinedCoordinates}
            onChangeText={(text) => this.handleInputChange('combinedCoordinates', text)}
          />
          <Button title="Calcular" onPress={this.handleCalcularClick} />
        </View>

        <View>
          <Text>Enter Latitude:</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }}
            value={this.state.enteredLat}
            onChangeText={(text) => this.handleInputChange('enteredLat', text)}
          />
          <Text>Enter Longitude:</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }}
            value={this.state.enteredLng}
            onChangeText={(text) => this.handleInputChange('enteredLng', text)}
          />
          <Button title="Add Marker" onPress={this.handleManualInput} />
        </View>

        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 20.672960406343122,
            longitude: -103.36882906094334,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={this.onMapClick}
        >
          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              onPress={() => this.onMarkerClick(marker)}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

export default MapContainer;
