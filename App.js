import React, { useState } from 'react';
import { StatusBar, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/register.js';
import OpenSesionScreen from './screens/openSesion.js';
import { styles } from './styles';

const Stack = createStackNavigator();

function App() {
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
        placeholder='email'
        placeholderTextColor="#E0E0CE"
        style={styles.textInput}
        onChangeText={handleEmailChange}
      />
      <View style={styles.passwordInputContainer}>
        <TextInput
          placeholder='password'
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
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={handleRegisterPress}>
        <Text style={styles.buttonTextNew}>Create a new account</Text>
      </TouchableOpacity>
    </View>
  );
}

export default App;