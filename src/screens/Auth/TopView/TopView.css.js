import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  topSection: {
    width: '100%',
    marginBottom: 30,
    paddingBottom: 20,
    backgroundColor: '#0A2540',
    paddingTop: 50,
    paddingHorizontal: 20,
    minHeight: 300,
    position: 'relative',
    zIndex: -1,
  },
  Elipse24: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  Elipse25: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    height: 30,
  },
  textsWrapper: {position: 'absolute', bottom: 20, left: 20},
  backButton: {
    color: '#FFF',
    fontSize: 24,
    marginBottom: 10,
  },
  registerTitle: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 50,
  },
});
module.exports = styles;
