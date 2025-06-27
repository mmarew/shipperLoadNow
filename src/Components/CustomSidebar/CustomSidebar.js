// components/CustomSidebar.js
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Image,
} from 'react-native';
import API_URL_AXIOS from '../../services/AxiosServices';
import { useSelector } from 'react-redux';
import decodeJWT from '../../utils/JWTDecoder/JWTDecoder';
import { trimText } from '../../utils/Formatter/Formatter';
import { width } from '../Constants/constant.utils';

const CustomSidebar = ({ isOpen, onClose, children }) => {
  const translateX = new Animated.Value(-500); // Start off-screen

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : -500,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={onClose}
          activeOpacity={1}
        />
      )}
      <Animated.View style={[styles.sidebar, { transform: [{ translateX }] }]}>
        {/* <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View> */}
        {children}
      </Animated.View>
    </>
  );
};
const CustomsSideBarList = ({
  savedProfileImage,
  toggleSidebar,
  sidebarOpen,
  setSelectedScreen,
}) => {
  const passengerSlices = useSelector(state => state?.passengerSlices);
  const passengersToken = passengerSlices?.passengersToken;
  // console.log('@passengersToken', passengersToken);

  const decodedProfileData = decodeJWT(passengersToken).data;

  console.log('@decodedProfileData', decodedProfileData);
  console.log('@CustomsSideBarList sidebarOpen', sidebarOpen);
  return (
    <CustomSidebar isOpen={sidebarOpen} onClose={toggleSidebar}>
      <View style={styles.drawerHeader}>
        <View style={{ alignItems: 'flex-end', marginBottom: -40 }}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => toggleSidebar()}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        {savedProfileImage?.attachedDocumentName && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'row',
            }}
          >
            <Image
              source={{
                uri: `${API_URL_AXIOS}/uploads/${savedProfileImage.attachedDocumentName}`,
              }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfoContainer}>
              {decodedProfileData?.fullName && (
                <Text style={styles.profileName}>
                  {trimText({ text: decodedProfileData?.fullName, size: 18 })}
                </Text>
              )}
              <Text style={styles.profileRole}>Passenger</Text>
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={sidebarItemStyles.container}
        onPress={() => {
          toggleSidebar();
          setSelectedScreen('Home');
        }}
      >
        <Text>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={sidebarItemStyles.container}
        onPress={() => {
          toggleSidebar();
          setSelectedScreen('Trip History');
        }}
      >
        <Text>Trip History</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={sidebarItemStyles.container}
        onPress={() => {
          setSelectedScreen('Settings');
          toggleSidebar();
        }}
      >
        <Text>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={sidebarItemStyles.container}
        onPress={() => {
          setSelectedScreen('Reload');
          toggleSidebar();
        }}
      >
        <Text>Reload</Text>
      </TouchableOpacity>

      {/* Add more menu items as needed */}
    </CustomSidebar>
  );
};
const sidebarItemStyles = {
  container: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
};
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
    // height: 300,
    borderStyle: 'solid',
    // backgroundColor: 'red',
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
});

export default CustomSidebar;
export { CustomsSideBarList };
