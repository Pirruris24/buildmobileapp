import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {Alert} from 'react-native';
import { Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { styles } from './../styles/styles';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword1, setHidePassword1] = useState(true); // Estado para el primer campo de contraseña
  const [hidePassword2, setHidePassword2] = useState(true); // Estado para el segundo campo de contraseña
  const [error, setError] = useState(null); // State variable for error message

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  const handleTogglePasswordVisibility1 = () => {
    setHidePassword1(!hidePassword1); // Invierte el estado para el primer campo de contraseña
  };

  const handleTogglePasswordVisibility2 = () => {
    setHidePassword2(!hidePassword2); // Invierte el estado para el segundo campo de contraseña
  };

  const signUpButton = () => {
    // console.log('Botón presionado');

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Campos Vacíos', 'Por favor, complete todos los campos.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Correo Inválido', 'Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Contraseñas No Coinciden', 'Las contraseñas ingresadas no coinciden.');
      return;
    }

    console.log('Correo electrónico válido:', email);
    console.log('Nombre:', name);
    console.log('Apellido:', lastName);
    console.log('Contraseña:', password);
    try {
      const response = axios.put(`http://192.168.100.47:8081/addBuildUser/${name}/${email}/${password}`);
      
      navigation.goBack();
      
  } catch (error) {
      console.error('Error logging in:', error); // Log the error for debugging purposes
      setError('Ha ocurrido un error. Por favor, intenta de nuevo.'); // Generic error message for the user
  }
    navigation.goBack();
  };

  const isValidEmail = (text) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(text);
  };

  return (
    <ImageBackground style={styles.container} source={require('./../assets/bg.png')}>

      <Text style={[styles.titulo, { fontSize: 60 }]}>REGISTRO</Text>
      <TextInput
        placeholder='Nombre(s)'
        placeholderTextColor="#E0E0CE"
        style={styles.textInput}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder='Email'
        placeholderTextColor="#E0E0CE"
        style={styles.textInput}
        value={email}
        onChangeText={handleEmailChange}
      />
      <View style={styles.passwordInputContainer}>
        <TextInput
          placeholder='Contraseña'
          placeholderTextColor="#E0E0CE"
          style={styles.textInput}
          onChangeText={handlePasswordChange}
          secureTextEntry={hidePassword1}
          value={password}
        />
        <TouchableOpacity onPress={handleTogglePasswordVisibility1} style={styles.togglePasswordButton}>
          <Text style={styles.togglePasswordButtonText}>{hidePassword1 ? 'Mostrar' : 'Ocultar'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.passwordInputContainer}>
        <TextInput
          placeholder='Confirmar Contraseña'
          placeholderTextColor="#E0E0CE"
          style={styles.textInput}
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry={hidePassword2}
          value={confirmPassword}
        />
        <TouchableOpacity onPress={handleTogglePasswordVisibility2} style={styles.togglePasswordButton}>
          <Text style={styles.togglePasswordButtonText}>{hidePassword2 ? 'Mostrar' : 'Ocultar'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={signUpButton} style={styles.boton}>
        <Text style={styles.buttonText}>Regístrate!</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      </ImageBackground>

  );
};

export default RegisterScreen;
