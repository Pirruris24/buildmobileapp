import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Button, Linking, TouchableOpacity } from 'react-native';
import FlipCard from 'react-native-flip-card';
import { styles } from './../styles/welcome';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const imageSize = 150;

const Home = () => {
  const abrirEnlaceINEGI = () => {
    Linking.openURL('https://www.inegi.org.mx/');
  };
  const navigation = useNavigation(); // Obteniendo el objeto de navegación
  const handleProbarPress = () => navigation.navigate('Recommended');
  return (
    <View style={styles.container}>
      <View style={styles.centered}>
        <FlipCard style={styles.flipCard} flipHorizontal={true} flipVertical={false} flip={false} friction={6} perspective={1000} clickable={true}>
          <View style={[styles.card]}>
            {/* Front Side */}
            <Image source={require('./../assets/BUILD.jpeg')} style={[styles.image]} />
            <View style={[styles.face]}>
            </View>
          </View>
          <View style={[styles.card]}>
            {/* Back Side */}
            <View style={[styles.face]}>
              <Text style={[styles.text]}>BUILD es una aplicacion que te ayuda a poder decidir con mayor facilidad donde hospedarte segun algunos indices (Crimen, hospitales, transporte..).</Text>
            </View>
          </View>
        </FlipCard>
        <FlipCard style={styles.flipCard} flipHorizontal={true} flipVertical={false} flip={false} friction={6} perspective={1000} clickable={true}>
          <View style={[styles.card]}>
            {/* Front Side */}
            <Image source={require('./../assets/why.jpg')} style={[styles.image]} />
            <View style={[styles.face]}>
            </View>
          </View>
          <View style={[styles.card]}>
            {/* Back Side */}
            <View style={[styles.face]}>
              <Text style={[styles.text]}>
                Nuestro compromiso es poder brindarte una mejor sugerencia para que encuentres un lugar más seguro en el que hospedarte, con índices basados en el{' '}
                <TouchableOpacity onPress={abrirEnlaceINEGI} style={{ fontSize: styles.text.fontSize }}>
                  <Text style={{ textDecorationLine: 'underline' }}>INEGI</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </FlipCard>

        <FlipCard style={styles.flipCard} flipHorizontal={true} flipVertical={false} flip={false} friction={6} perspective={1000} clickable={true}>
          <View style={[styles.card]}>
            {/* Front Side */}
            <Image source={require('./../assets/ia.png')} style={[styles.image]} />
            <View style={[styles.face]}>
            </View>
          </View>
          <View style={[styles.card]}>
            {/* Back Side */}
            <View style={[styles.face]}>
              <Text style={[styles.text]}>Puedes probar nuestra aplicacion pulsando el boton de abajo</Text>
              <View style={styles.buttonContainer}>
                <Button title="Probar App" onPress={handleProbarPress} />
              </View>
            </View>
          </View>
        </FlipCard>
      </View>
    </View>
  );
};

export default Home;
