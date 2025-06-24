import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  fullScreen: {
    flex: 1,
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
    paddingBottom: 20,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  drawerLabel: {
    marginLeft: -15,
    fontSize: 16,
    fontFamily: 'Manrope sans-serif', // Suggest using 'System' for default platform font
  },
  closeButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#075985',
  },
  profileImage: {
    height: 90,
    width: 90,
    borderRadius: 45,
  },
  profileInfoContainer: {
    flexDirection: 'column',
    marginLeft: 20,
    marginBottom: -30,
  },
  profileName: {
    fontSize: 20,
    color: '#111111',
    fontFamily: 'System', // Use 'System' or a custom font like 'Manrope'
    fontWeight: 'normal',
    fontFamily: 'Manrope', // Changed to 'Manrope' font
  },
  profileRole: {
    color: '#71717A',
    fontWeight: '500',
    fontFamily: 'Manrope', // Changed to 'Manrope' font
    fontSize: 14,
  },
});

export const navigationStyles = {
  drawerActive: {
    backgroundColor: '#E0F2FE',
    tintColor: '#000',
  },
  drawerInactive: {
    tintColor: '#333',
  },
  header: {
    style: {backgroundColor: '#075985'},
    tintColor: '#fff',
    titleStyle: {fontWeight: 'bold'},
  },
};
