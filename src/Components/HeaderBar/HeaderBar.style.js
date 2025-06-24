import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    // top: 50,
    // left: 20, // Ensures it's not flush left
    zIndex: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
});

export default styles;
