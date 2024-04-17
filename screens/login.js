import React, { useState } from 'react';
import axios from 'axios';
import { StatusBar, Text, View, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './../styles/styles';

function LogIn() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [error, setError] = useState(null); // State variable for error message

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

        try {
            const response = await axios.post(`http://172.20.10.4:8081/login/${email} ${password}`);
            
                navigation.navigate('Recommended');
                setError(null);
                
            
        } catch (error) {
            console.error('Error logging in:', error); // Log the error for debugging purposes
            setError('Ha ocurrido un error. Por favor, intenta de nuevo.'); // Generic error message for the user
        }
    };

    const handleRegisterPress = () => navigation.navigate('Register');

    const isValidEmail = (text) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);

    return (
        <ImageBackground style={styles.container} source={require('./../assets/bg.png')}>

            <Text style={styles.titulo}>BUILD</Text>
            <TextInput
                placeholder='Email'
                placeholderTextColor="#E0E0CE"
                style={styles.textInput}
                onChangeText={handleEmailChange}
            />
            <View style={styles.passwordInputContainer}>
                <TextInput
                    placeholder='Contraseña'
                    placeholderTextColor="#E0E0CE"
                    style={styles.textInput}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={hidePassword}
                />
                <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.togglePasswordButton}>
                    <Text style={styles.togglePasswordButtonText}>{hidePassword ? 'Mostrar' : 'Ocultar'}</Text>
                </TouchableOpacity>
            </View>
            {error && <Text style={[styles.errorText, { color: 'white' }]}>{error}</Text>}
            <TouchableOpacity onPress={signInButton} style={styles.boton}>
                <Text style={styles.buttonText}>Inicia Sesión</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleRegisterPress}>
                <Text style={styles.buttonTextNew}>Crear nueva cuenta</Text>
            </TouchableOpacity>
            </ImageBackground>

    );
}

export default LogIn;
