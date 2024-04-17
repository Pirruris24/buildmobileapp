import React, { useState } from 'react';
import axios from 'axios';
import { StatusBar, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/register.js';
import OpenSesionScreen from './screens/openSesion.js';
import LogIn from './screens/login.js';
import Recommended from './screens/recommended_location.js';
import { styles } from './styles/styles.js';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BUILD!"
          component={AppContent}
          options={{
            title: 'BUILD',
            headerTransparent: true,
            headerTintColor: '#e0e0ce',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Inicia"
          component={LogIn}
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
            title: 'Registro!',
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
        {/*
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
        /> */}
        <Stack.Screen
          name="Recommended"
          component={Recommended} 
          options={{
            title: 'Recomendar Ubicación', 
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

  const signInButton = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Campos Vacíos', 'Por favor, complete todos los campos.');
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert('Correo Electrónico Inválido', 'Por favor ingresa un correo electrónico válido.');
      return;
    }

    navigation.navigate('OpenSesionScreen');

  
    // try {
    //   const response = await fetch('http://127.0.0.1:8000/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       buser_email: email,
    //       buser_password: password,
    //     }),
    //   });
  
    //   if (!response.ok) {
    //     throw new Error('Error de red - ' + response.status);
    //   }
  
    //   // Si la solicitud fue exitosa, navega a la siguiente pantalla
    //   navigation.navigate('OpenSesionScreen');
    // } catch (error) {
    //   console.error('Error al realizar la solicitud:', error);
    //   Alert.alert('Error', 'Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    // }
  };  
  
  const handleLogInPress = () => navigation.navigate('Inicia')
  const handleRegisterPress = () => navigation.navigate('Register');

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>BUILD</Text>
      <TouchableOpacity onPress={handleLogInPress} style={styles.boton}>
        <Text style={styles.buttonText}>LogIn</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={handleRegisterPress}>
        <Text style={styles.buttonTextNew}>Crear nueva cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

export default App;