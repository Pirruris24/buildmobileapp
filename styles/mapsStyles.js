import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // menuContainer: {
  //   position: 'absolute',
  //   top: 0,
  //   right: 0,
  //   zIndex: 1,
  //   margin: 30,
  // },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '15%',
    height: height, // Altura igual a la altura de la ventana
  },
  searchContainer: {
    position: 'absolute',
    bottom: 485,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    height: 70,
  },
  input: {
    borderRadius: 15, // Ajusta el valor según lo redondeado que desees
    backgroundColor: '#FFFFFF', // Color de fondo blanco
    flex: 1,
    height: 40,
    width: 120,
    // borderWidth: 1,
    // borderColor: 'gray',
    paddingHorizontal: 10,
    marginRight: 10,
    zIndex: 1,
  },
  inputLabel: {
    fontWeight: 'bold', // Establece negrita (bold)
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
