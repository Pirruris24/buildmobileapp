import { StyleSheet } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E5982D',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'url: "./assets/background.jpg" ',
      backgroundSize: 'cover',
    },

    stackHeader:{
      backgroundColor:'#FFF',
    },
  

      gradientBackground: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      passwordInputContainer:{
        width:'80%', // ajusta el ancho del contenedor según tus necesidades
        flexDirection: 'row', // establece la dirección de flexión en fila
        alignItems: 'center', // alinea los elementos verticalmente al centro
        justifyContent: 'center', // alinea los elementos horizontalmente al centro
      },
    
      boton:{
        marginLeft: 10, // Espacio entre el TextInput y el botón
        marginTop: 20,
        backgroundColor: '#E0E0CE', // Color de fondo del botón
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: 178,
        height: 54,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
      },

      togglePasswordButton:{
      },
    
      buttonText: {
        color: 'black', // Color del texto del botón
        fontSize: 16,
        fontSize: 20,
        fontWeight: 'bold',
      },

      buttonTextNew: {
        color: '#E0E0CE', // Color del texto del botón
        fontSize: 14,
        fontWeight: 'bold',
        margin: 10,
      },
    
      titulo:{
        fontSize: 80,
        color: '#000000',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)', // Color de la sombra
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5, // Radio de la sombra
      },
    
      subTitulo:{
        fontSize: 20,
        color: 'gray',
          fontWeight: 'bold',
      },
    
      textInput:{
        padding: 10,
        borderBottomWidth: 1,
        fontSize: 16,
        color: '#E0E0CE',
        borderColor: 'black',
        width: '80%',
        margin: 10,
        borderRadius: 30,
        height: 50,
        backgroundColor:'transparent',
        paddingStart: 30,
        
      }
});









