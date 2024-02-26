import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  mapContainer: {
    flex: 1,
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
