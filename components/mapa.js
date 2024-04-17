import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, TextInput, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
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
      latitudeInput: '20.6578',
      longitudeInput: '-103.3244',
      userClickedCoordinates: null,
      markers: [],
      apiResponse: null,
    };

    this.mapRef = null;
  }

  handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    this.setState({
      markerCoordinates: coordinate,
      latitudeInput: `${coordinate.latitude}`,
      longitudeInput: `${coordinate.longitude}`,
      userClickedCoordinates: coordinate,
    }, () => {
      if (this.mapRef) {
        this.mapRef.animateToRegion({
          ...coordinate,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    });
  }

  handleManualInput = async () => {
    this.setState({
      markers: [],
    });

    const enteredLat = parseFloat(this.state.latitudeInput);
    const enteredLng = parseFloat(this.state.longitudeInput);

    if (!isNaN(enteredLat) && !isNaN(enteredLng)) {
      const newMarker = {
        latitude: enteredLat,
        longitude: enteredLng,
        color: 'blue',
      };

      this.setState((prevState) => ({
        markers: [...prevState.markers, newMarker],
      }));

      // Make an API request with the entered coordinates using Axios
      try {
        const response = await axios.get(`http://172.20.10.4:8081/predictZone/${enteredLng}/${enteredLat}`);

        if (response.status === 200) {
          const data = response.data;

          this.setState({
            apiResponse: data,
          });

          this.fetchNearbyHotels(data.latitud, data.longitud);

          const predictedMarker = {
            latitude: parseFloat(data.latitud),
            longitude: parseFloat(data.longitud),
          };

          this.setState((prevState) => ({
            markers: [
              ...prevState.markers,
              { ...newMarker, color: 'yellow' },
              { ...predictedMarker, color: 'green' },
            ],
          }));
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


  fetchNearbyHotels = async (lat, lng) => {
    // Make an API request to fetch nearby hotels
    try {
      const response = await fetch(
        `http://172.20.10.4:8081/fetchNearbyHotels/${lng}/${lat}`
      );
  
      if (!response.ok) {
        throw new Error('API request failed');
      }
  
      const data = await response.json();
  
      // Update the state with the nearby hotels data
      this.setState({
        nearbyHotels: data,
      });
    } catch (error) {
      console.error('Error fetching nearby hotels data:', error);
    }
  };


  render() {
    const { markerCoordinates, markers, nearbyHotels } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            ref={ref => { this.mapRef = ref; }}
            style={[styles.map, { height: mapHeight }]}
            initialRegion={{
              ...markerCoordinates,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={this.handleMapPress}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker}
                pinColor={marker.color}
              />
            ))}
          </MapView>
        </View>
        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.input}
            value={this.state.latitudeInput}
            onChangeText={(text) => this.setState({ latitudeInput: text })}
          />
          <TextInput
            style={styles.input}
            value={this.state.longitudeInput}
            onChangeText={(text) => this.setState({ longitudeInput: text })}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleManualInput}>
            <Text>Add Marker</Text>
          </TouchableOpacity>
        </View>
        {nearbyHotels && (
  <View style={styles.apiResponseContainer}>
    <Text style={styles.apiResponseText}>Near By Hotels:</Text>
    <FlatList
      data={nearbyHotels}
      renderItem={({ item }) => (
        <Text>{JSON.stringify(item)}</Text>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
)}
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
  apiResponseContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  apiResponseText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
