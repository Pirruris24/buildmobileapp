import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Menu from './../components/menu';
// import { styles } from './../styles/mapsStyles';


const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <Menu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1, // Para asegurar que el menú esté encima del mapa
    margin:30,
    // left:20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  safestText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
