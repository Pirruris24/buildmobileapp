import React from 'react';
import { View, Text } from 'react-native';
import Mapa from '../components/mapa';
import { styles } from './../styles/mapsStyles';

export default function ScreenConMapa() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <Mapa />
      </View>
    </View>
  );
}
