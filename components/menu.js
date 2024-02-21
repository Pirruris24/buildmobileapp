import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Menu = ({ navigation }) => {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigateToScreen('Safest')} style={styles.menuItem}>
        <Text style={styles.menuText}>Safest</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Business')} style={styles.menuItem}>
        <Text style={styles.menuText}>Business</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Crime')} style={styles.menuItem}>
        <Text style={styles.menuText}>Crime</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Transportation')} style={styles.menuItem}>
        <Text style={styles.menuText}>Transportation</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('RecommendedLocation')} style={styles.menuItem}>
        <Text style={styles.menuText}>Recommended Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  menuItem: {
    padding: 5,
  },
  menuText: {
    fontSize: 16,
  },
});

export default Menu;
