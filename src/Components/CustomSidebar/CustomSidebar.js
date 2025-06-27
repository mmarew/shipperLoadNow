// components/CustomSidebar.js
import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  Image,
  StyleSheet,
} from 'react-native';
import API_URL_AXIOS from '../../services/AxiosServices';
import { useSelector } from 'react-redux';
import decodeJWT from '../../utils/JWTDecoder/JWTDecoder';
import { trimText } from '../../utils/Formatter/Formatter';
import styles from './CustomSidebar.style';

const CustomSidebar = ({ isOpen, onClose, children }) => {
  const translateX = useRef(new Animated.Value(-500)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : -500,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isOpen, translateX]);

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
        {children}
      </Animated.View>
    </>
  );
};

const sidebarItems = [
  { label: 'Home', screen: 'Home' },
  { label: 'Trip History', screen: 'Trip History' },
  { label: 'Settings', screen: 'Settings' },
  { label: 'Reload', screen: 'Reload' },
];

const CustomsSideBarList = ({
  savedProfileImage,
  toggleSidebar,
  sidebarOpen,
  setSelectedScreen,
}) => {
  const passengersToken = useSelector(
    state => state?.passengerSlices?.passengersToken,
  );
  const decodedProfileData = decodeJWT(passengersToken)?.data;
  const [activeScreen, setActiveScreen] = useState(sidebarItems?.[0].screen);
  return (
    <CustomSidebar isOpen={sidebarOpen} onClose={toggleSidebar}>
      <View style={styles.drawerHeader}>
        <View style={{ alignItems: 'flex-end', marginBottom: -40 }}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleSidebar}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
        {savedProfileImage?.attachedDocumentName && (
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Image
              source={{
                uri: `${API_URL_AXIOS}/uploads/${savedProfileImage.attachedDocumentName}`,
              }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfoContainer}>
              {decodedProfileData?.fullName && (
                <Text style={styles.profileName}>
                  {trimText({ text: decodedProfileData.fullName, size: 18 })}
                </Text>
              )}
              <Text style={styles.profileRole}>Passenger</Text>
            </View>
          </View>
        )}
      </View>
      {sidebarItems.map(item => (
        <TouchableOpacity
          key={item.screen}
          style={{
            ...sidebarItemStyles.tabContainer,
            backgroundColor:
              activeScreen == item.screen ? '#E0F2FE' : '#ffffff',
          }}
          onPress={() => {
            setSelectedScreen(item.screen);
            toggleSidebar();
            setActiveScreen(item.screen);
          }}
        >
          <Text
            style={{ color: activeScreen == item.screen ? 'black' : 'black' }}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </CustomSidebar>
  );
};
/* #b0b99d  */

/* #e5e8df  */

// width: 100px;
// height: 100px;

// /* sky/100 */
// background: #E0F2FE;

// /* Inside auto layout */
// flex: none;
// order: 1;
// flex-grow: 0;

const sidebarItemStyles = StyleSheet.create({
  tabContainer: {
    paddingVertical: 15,
    // backgroundColor: isActiveScreen 'blue',
    paddingLeft: 10,
  },
});

export default CustomSidebar;
export { CustomsSideBarList };
