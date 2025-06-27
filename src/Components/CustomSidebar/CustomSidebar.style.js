import { StyleSheet } from 'react-native';
import { width } from '../Constants/constant.utils';

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.9,
    height: '100%',
    backgroundColor: 'white',
    zIndex: 100,
    elevation: 5,
    padding: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 99,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 24,
    padding: 10,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#333',
  },
  drawerContainer: {
    flex: 1,
    width: '100%',
  },
  drawerStyle: {
    width: '90%',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  drawerHeader: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    borderStyle: 'solid',
    paddingBottom: 20,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
  },
  drawerHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  drawerLabel: {
    marginLeft: -15,
    fontSize: 16,
  },
  profileImage: {
    height: 90,
    width: 90,
    borderRadius: 45,
    marginRight: 20,
  },
  closeButtonText: { fontSize: 20, fontWeight: 'bold', color: 'red' },
  profileName: { fontWeight: 'bold' },
});

export default styles;
