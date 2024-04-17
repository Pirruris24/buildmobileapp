import React, { useState } from 'react';
import axios from 'axios';
import { StatusBar, Text, View, TextInput, TouchableOpacity, Alert, ImageBackground, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/register.js';
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

  
  const handleLogInPress = () => navigation.navigate('Inicia')
  const handleRegisterPress = () => navigation.navigate('Register');

  return (
    <ScrollView style={{gap:20}}>
    <ImageBackground source={require('./assets/bg.png')} style={styles.container}>
      <Text style={styles.titulo}>BUILD</Text>
      <View style={[styles.description, { alignItems: 'center', marginTop: 20 }]}>

        <Text style={{ color: 'white', fontSize: 20, marginBottom: 10, textAlign:'center'}}>Estimados Visitantes,</Text>
        <Text style={{ color: 'white', marginBottom: 10, textAlign:'justify' }}>En nuestro sitio web, garantizar su seguridad y bienestar es nuestra principal prioridad. Para ayudarle a tomar decisiones informadas al seleccionar alojamientos, utilizamos un conjunto integral de criterios para identificar las áreas más seguras. Nuestros criterios incluyen los siguientes factores:</Text>
        <Text style={{ color: 'white', fontSize: 18, marginBottom: 10 }}>Criterios de Seguridad:</Text>
        <View style={{ width: '80%' }}>
          <Text style={{ color: 'white', textAlign:'justify' }}>1. Índice de Crimen: Calculamos un índice de crimen basado en varios puntos de datos de delitos en la zona, brindándole información sobre el nivel de seguridad de cada ubicación.</Text>
          <Text style={{ color: 'white', marginTop: 10, textAlign:'justify' }}>2. Comisarías de Policía: Consideramos la proximidad de las comisarías de policía al hotel, asegurando un acceso rápido a los servicios policiales si es necesario.</Text>
          <Text style={{ color: 'white', marginTop: 10, textAlign:'justify' }}>3. Hospitales Cercanos: El acceso a instalaciones de atención médica es crucial. Evaluamos la distancia a hospitales cercanos, asegurando que la asistencia médica esté disponible rápidamente.</Text>
          <Text style={{ color: 'white', marginTop: 10, textAlign:'justify' }}>4. Farmacias: Además, evaluamos la disponibilidad de farmacias en las cercanías, asegurando el acceso a medicamentos esenciales y productos de atención médica.</Text>
        </View>
        <Text style={{ color: 'white', marginTop: 10, textAlign:'justify' }}>Al incorporar estos criterios en nuestro proceso de evaluación, nos esforzamos por ofrecerle tranquilidad y una estancia segura durante su visita. Su seguridad es importante para nosotros, y estamos comprometidos a brindarle una mejor opción de hospedaje para su seguridad.</Text>
      </View>
      <TouchableOpacity onPress={handleLogInPress} style={styles.boton}>
        <Text style={styles.buttonText}>LogIn</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={handleRegisterPress}>
        <Text style={styles.buttonTextNew}>Crear nueva cuenta</Text>
      </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
}

export default App;