import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    zIndex: 2,
    width: 50,
    height: 50,
    borderRadius: 25,
    top: 50,
    left: 20, // optional positioning
    backgroundColor: 'blue',
    // ❌ Remove padding
    // ✅ Add centering
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
});

export default styles;
