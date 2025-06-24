import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  mapContainer: {
    flex: 0.5,
  },
  bottomContainer: {
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // paddingBottom: 40,
  },
  infoContainer: {
    flex: 0.3, // 30% of the container height
    backgroundColor: 'white',
    padding: 25,
    flexDirection: 'column',
  },

  buttonContainer: {
    marginTop: 50,
  },
});

export default styles;
