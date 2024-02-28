import React, { useState } from 'react';
import { StatusBar, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/register.js';
import OpenSesionScreen from './screens/openSesion.js';
import Safest from './screens/safest.js';
import Business from './screens/business.js';
import Crime from './screens/crime.js';
import Transportation from './screens/transportation.js';
import Recommended from './screens/recommended_location.js';
import { styles } from './styles/styles.js';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BIENVENIDO!"
          component={AppContent}
          options={{
            title: 'Inicia Sesión',
            headerTransparent: true,
            headerTintColor: '#e0e0ce',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: 'Register!',
            headerTransparent: true,
            headerTintColor: '#e0e0ce',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="OpenSesionScreen"
          component={OpenSesionScreen} 
          options={{
            title: 'BIENVENIDO', 
            headerTransparent: true,
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Safest"
          component={Safest} 
          options={{
            title: 'SAFEST', 
            headerTransparent: true,
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Business"
          component={Business} 
          options={{
            title: 'BUSINESS', 
            headerTransparent: true,
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Crime"
          component={Crime} 
          options={{
            title: 'CRIME', 
            headerTransparent: true,
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Transportation"
          component={Transportation} 
          options={{
            title: 'TRANSPORTATION', 
            headerTransparent: true,
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Recommended"
          component={Recommended} 
          options={{
            title: 'RECOMMENDED LOCATION', 
            headerTransparent: true,
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


function AppContent() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const handleEmailChange = (text) => setEmail(text);
  const handlePasswordChange = (text) => setPassword(text);
  const handleTogglePasswordVisibility = () => setHidePassword(!hidePassword);

  const signInButton = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Campos Vacíos', 'Por favor, complete todos los campos.');
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert('Correo Electrónico Inválido', 'Por favor ingresa un correo electrónico válido.');
      return;
    }
    navigation.navigate('OpenSesionScreen'); 
    console.log('Correo electrónico válido:', email);
    console.log('Contraseña:', password);
  };

  const handleRegisterPress = () => navigation.navigate('Register');

  const isValidEmail = (text) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>BUILD</Text>
      <TextInput
        placeholder='Email'
        placeholderTextColor="#E0E0CE"
        style={styles.textInput}
        onChangeText={handleEmailChange}
      />
      <View style={styles.passwordInputContainer}>
        <TextInput
          placeholder='Contrsaseña'
          placeholderTextColor="#E0E0CE"
          style={styles.textInput}
          onChangeText={handlePasswordChange}
          secureTextEntry={hidePassword}
        />
        <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.togglePasswordButton}>
          <Text style={styles.togglePasswordButtonText}>{hidePassword ? 'Mostrar' : 'Ocultar'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={signInButton} style={styles.boton}>
        <Text style={styles.buttonText}>Inicia Sesión</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={handleRegisterPress}>
        <Text style={styles.buttonTextNew}>Crear nueva cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

export default App;