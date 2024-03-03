export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5982D',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipCard: {
    width: 300,
    height: 200,
    borderWidth: 0,
    borderRadius: 10,
  },
  card: {
    width: '100%',
    marginTop: 50,
    height: 200,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  face: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: 'black', // Color de fondo negro
    borderRadius: 10, // Redondea las esquinas
  },
  buttonText: {
    color: 'white', // Color del texto en blanco
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
