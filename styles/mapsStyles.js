import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1, // Para asegurar que el menú esté encima del mapa
    margin:30,
    // left:20,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '15%', // Espacio en la parte inferior para que el mapa ocupe el 70% de la pantalla
  },

  searchContainer: {
    position: 'absolute',
    bottom: 485, // Esta posición debería ajustarse o eliminarse si no es necesaria
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
    flex: 1,
    height: 40,
    width: 120,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.7)',
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
