import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Menu = () => {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
    handleClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.option} onPress={toggleMenu}>
          <Text style={styles.optionText}>{isOpen ? 'Cerrar' : 'Abrir'} Menú</Text>
        </TouchableOpacity>
        {isOpen && (
          <>
            <TouchableOpacity style={styles.option} onPress={() => navigateToScreen('OpenSesionScreen')}>
              <Text style={styles.optionText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => navigateToScreen('Safest')}>
              <Text style={styles.optionText}>Safest</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => navigateToScreen('Business')}>
              <Text style={styles.optionText}>Business</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => navigateToScreen('Crime')}>
              <Text style={styles.optionText}>Crime</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => navigateToScreen('Transportation')}>
              <Text style={styles.optionText}>Transportation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => navigateToScreen('Recommended')}>
              <Text style={styles.optionText}>Recommended Location</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginRight: 20,
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    width: 150,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Menu;
