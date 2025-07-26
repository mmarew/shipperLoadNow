// import React, { useState } from 'react';
// import {
//   View,
//   TouchableOpacity,
//   ScrollView,
//   StatusBar,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import ProfileScreen from '../ProfileScreen/ProfileScreen';
// import TripHistory from '../../Components/TripHistory/TripHistory';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useDispatch } from 'react-redux';
// import {
//   addPassengerStatus,
//   addPassengersToken,
// } from '../../Redux/slices/PassengerSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import createStyles from './Settings.css';
// import getAppsColorStyles, {
//   getAppsBarStyles,
// } from '../../GlobalStyles/AppsColorStyles';
// import { Text } from 'react-native-paper';

// const SettingsScreen = () => {
//   const barStyles = getAppsBarStyles();
//   const styles = createStyles();
//   const ColorStyles = getAppsColorStyles();
//   const [visibleDetail, setVisibleDetail] = useState(null);

//   const dispatch = useDispatch();

//   const clearAsyncStorage = async () => {
//     try {
//       await AsyncStorage.removeItem('passengersToken');
//       dispatch(addPassengersToken(null));
//       // You might also want to reset other related state
//       dispatch(addPassengerStatus(undefined));

//       // Optional: Clear all storage if needed
//       // await AsyncStorage.clear();

//       // Navigate to the initial screen after clearing
//     } catch (error) {
//       console.error('Failed to clear AsyncStorage:', error);
//       // Handle error appropriately
//     }
//   };
//   const handleLogout = () => {
//     Alert.alert(
//       'Logout',
//       'Are you sure you want to logout?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Logout',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               clearAsyncStorage(); // Optionally navigate to login or splash screen
//               // navigation.replace('Login');
//             } catch (e) {
//               // handle error if needed
//             }
//           },
//         },
//       ],
//       { cancelable: true },
//     );
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <StatusBar
//         barStyle={barStyles}
//         backgroundColor={ColorStyles.backgroundColor}
//       />
//       <ScrollView style={styles.container}>
//         {console.log('visibleDetail', visibleDetail)}
//         {visibleDetail == null ? (
//           <View>
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Account</Text>
//               <SettingsItem
//                 title="My Profile"
//                 icon="person-outline"
//                 navigateTo="profile"
//                 setVisibleDetail={setVisibleDetail}
//               />
//             </View>

//             <TouchableOpacity
//               onPress={handleLogout}
//               style={styles.logoutButton}
//             >
//               <Text style={styles.logoutButtonText}>Logout</Text>
//             </TouchableOpacity>

//             {/* Footer */}
//             <Text style={styles.footerText}>
//               X Shipment tracking 2024 all rights reserved
//             </Text>
//           </View>
//         ) : visibleDetail == 'profile' ? (
//           <ProfileScreen setVisibleDetail={setVisibleDetail} />
//         ) : visibleDetail == 'Trip History' ? (
//           <TripHistory setVisibleDetail={setVisibleDetail} />
//         ) : (
//           <View>
//             <Text>some text</Text>
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const SettingsItem = ({ title, icon, navigateTo, setVisibleDetail }) => {
//   const styles = createStyles();

//   return (
//     <TouchableOpacity
//       onPress={() => {
//         setVisibleDetail(navigateTo);
//         console.log('pressed');
//       }}
//       style={styles.settingsItem}
//     >
//       <View style={styles.settingsItemLeft}>
//         <Icon name={icon} size={20} color="gray" />
//         <Text style={styles.settingsItemText}>{title}</Text>
//       </View>
//       <Icon name="chevron-forward-outline" size={20} color="gray" />
//     </TouchableOpacity>
//   );
// };

// export default SettingsScreen;
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
import fontFamily from '../../GlobalStyles/FontFamily';
import store from '../../Redux/Store/Store';
import { updateIsDarkMode } from '../../Redux/slices/PassengerSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [pushNotification, setPushNotification] = useState(true);
  const ColorStyles = getAppsColorStyles();
  const styles = createStyles();
  const dispatch = useDispatch();

  const passengerSlices = useSelector(state => state?.passengerSlices);
  console.log('@passengerSlices', passengerSlices);
  const isDarkMode = passengerSlices?.isDarkMode;
  const handleDarkModeToggle = async () => {
    const previousDarkMode = await AsyncStorage.getItem('isDarkMode');
    console.log('@handleDarkModeToggle previousDarkMode', previousDarkMode);
    let newDarkMode = 'false';
    if (previousDarkMode === 'false') {
      newDarkMode = 'true';
    }
    await AsyncStorage.setItem('isDarkMode', newDarkMode);

    dispatch(updateIsDarkMode(newDarkMode));
  };

  const SectionItem = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.iconLabel}>
        <Icon name={icon} size={20} color={ColorStyles.darkGray} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Icon name="chevron-right" size={20} color={ColorStyles.darkGray} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <Text style={styles.title}>Settings</Text>

      {/* Account Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Account</Text>
        <SectionItem icon="user" label="My Profile" />
        <SectionItem icon="history" label="Trip History" />
        <SectionItem icon="map-marker-alt" label="Favorite Locations" />
      </View>

      {/* Theme Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Theme</Text>
        <View style={styles.item}>
          <View style={styles.iconLabel}>
            <Icon name="moon" size={20} color={ColorStyles.darkGray} />
            <Text style={styles.label}>Dark Mode</Text>
          </View>
          <Switch
            value={isDarkMode === 'true' ? true : false}
            onValueChange={() => {
              handleDarkModeToggle(darkMode);
            }}
            thumbColor={
              darkMode ? ColorStyles.brandColor : ColorStyles.whiteColor
            }
            trackColor={{
              false: ColorStyles.whiteBGColor,
              true: ColorStyles.mediumSkyBlue,
            }}
          />
        </View>
        <View style={styles.item}>
          <View style={styles.iconLabel}>
            <Icon name="bell" size={20} color={ColorStyles.darkGray} />
            <Text style={styles.label}>Push Notification</Text>
          </View>
          <Switch
            value={pushNotification}
            onValueChange={() => setPushNotification(!pushNotification)}
            thumbColor={ColorStyles.brandColor}
            trackColor={{
              false: ColorStyles.whiteBGColor,
              true: ColorStyles.mediumSkyBlue,
            }}
          />
        </View>
      </View>

      {/* Other Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Other</Text>
        <SectionItem icon="life-ring" label="Help Center" />
        <SectionItem icon="shield-alt" label="Privacy Policy" />
        <SectionItem icon="share-alt" label="Invite Friends" />
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete Account</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        X Shipment tracking 2024 all rights reserved
      </Text>
    </ScrollView>
  );
};

export default SettingsScreen;
const createStyles = () => {
  const ColorStyles = getAppsColorStyles();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: ColorStyles.backgroundColor,
    },
    scroll: {
      padding: 20,
      paddingBottom: 40,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      fontFamily: fontFamily.manropeRegular,

      color: ColorStyles.lablesColor,
      textAlign: 'center',
      marginBottom: 20,
    },
    card: {
      backgroundColor: ColorStyles.whiteBGColor,
      borderRadius: 10,
      padding: 15,
      marginBottom: 20,
    },
    sectionTitle: {
      fontFamily: fontFamily.manropeRegular,
      color: ColorStyles.lablesColor,
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 10,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
    },
    iconLabel: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    label: {
      fontFamily: fontFamily.manropeRegular,

      color: ColorStyles.darkGray,
      fontSize: 14,
    },
    logoutButton: {
      backgroundColor: ColorStyles.brandColor,
      borderRadius: 10,
      paddingVertical: 14,
      marginBottom: 15,
      alignItems: 'center',
    },
    logoutText: {
      fontFamily: fontFamily.manropeRegular,

      color: ColorStyles.whiteColor,
      fontWeight: '600',
      fontSize: 16,
    },
    deleteButton: {
      backgroundColor: ColorStyles.errorColor,
      borderRadius: 10,
      paddingVertical: 14,
      alignItems: 'center',
    },
    deleteText: {
      fontFamily: fontFamily.manropeRegular,

      color: ColorStyles.whiteColor,
      fontWeight: '600',
      fontSize: 16,
    },
    footer: {
      marginTop: 30,
      textAlign: 'center',
      fontFamily: fontFamily.manropeRegular,

      color: ColorStyles.whiteColor,
      fontSize: 12,
      opacity: 0.6,
    },
  });
  return styles;
};
