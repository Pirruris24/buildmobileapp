import React, { useState } from 'react';
import axios from 'axios';
import { StatusBar, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './../styles/styles';

function LogIn() {
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
  
      navigation.navigate('Recommended');
  
    
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
  
  export default LogIn;