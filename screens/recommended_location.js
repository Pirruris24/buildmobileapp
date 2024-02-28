import React from 'react';
import { View, StyleSheet } from 'react-native';
import Mapa from '../components/mapa';
import Menu from './../components/menu';
import { styles } from '../styles/mapsStyles';

export default function ScreenConMapa() {
  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <Menu />
      </View>
      <View style={styles.mapContainer}>
        <Mapa/>
      </View>
    </View>
  );
}