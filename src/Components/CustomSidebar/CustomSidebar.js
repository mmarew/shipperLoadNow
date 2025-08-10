// components/CustomSidebar.js
import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Image,
  StyleSheet,
} from 'react-native';
import API_URL_AXIOS from '../../services/AxiosServices';
import { useSelector } from 'react-redux';
import decodeJWT from '../../utils/JWTDecoder/JWTDecoder';
import { trimText } from '../../utils/Formatter/Formatter';
import { setSelectedScreen } from '../../Redux/slices/PassengerSlice';
import store from '../../Redux/Store/Store';
import createStyles from './CustomSidebar.style';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
import { Text } from 'react-native-paper';

const CustomSidebar = ({ isOpen, onClose, children }) => {
  const translateX = useRef(new Animated.Value(-500)).current;
  const styles = createStyles();
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

const CustomsSideBarList = ({
  savedProfileImage,
  toggleSidebar,
  sidebarOpen,
  selectedScreen,
  sidebarItems,
}) => {
  const ColorStyles = getAppsColorStyles();

  const styles = createStyles();
  const passengersToken = useSelector(
    state => state?.passengerSlices?.passengersToken,
  );
  const decodedProfileData = decodeJWT(passengersToken)?.data;

  const [imageError, setImageError] = useState(false);

  // Determine the image source
  const getImageSource = () => {
    if (!savedProfileImage?.attachedDocumentName || imageError) {
      return require('../../assets/icons/userIcon.png'); // Fallback to local asset
    } else {
      return {
        uri: `${API_URL_AXIOS}/uploads/${savedProfileImage.attachedDocumentName}`,
      };
    }
  };
  return (
    <CustomSidebar isOpen={sidebarOpen} onClose={toggleSidebar}>
      <View style={styles.drawerContainer}>
        <View style={styles.drawerHeader}>
          <View style={{ alignItems: 'flex-end', marginBottom: -40 }}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleSidebar}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Image
              source={getImageSource()}
              onError={() => setImageError(true)} // Trigger if image fails to load
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
        </View>
        {sidebarItems.map(item => (
          <TouchableOpacity
            key={item.screen}
            style={{
              ...sidebarItemStyles.tabContainer,
              backgroundColor:
                selectedScreen == item.screen
                  ? '#E0F2FE'
                  : ColorStyles.backgroundColor,
            }}
            onPress={() => {
              store.dispatch(setSelectedScreen(item.screen));
              toggleSidebar();
            }}
          >
            <Text
              style={{
                color:
                  selectedScreen == item.screen
                    ? ColorStyles.brandColor
                    : ColorStyles.textColor,
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </CustomSidebar>
  );
};

const sidebarItemStyles = StyleSheet.create({
  tabContainer: {
    paddingVertical: 15,
    paddingLeft: 10,
  },
});

export default CustomSidebar;
export { CustomsSideBarList };
