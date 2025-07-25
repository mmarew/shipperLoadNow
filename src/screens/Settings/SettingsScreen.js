import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import TripHistory from '../../Components/TripHistory/TripHistory';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import {
  addPassengerStatus,
  addPassengersToken,
} from '../../Redux/slices/PassengerSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createStyles from './Settings.css';
import getAppsColorStyles, {
  getAppsBarStyles,
} from '../../GlobalStyles/AppsColorStyles';
import { Text } from 'react-native-paper';

const SettingsScreen = () => {
  const barStyles = getAppsBarStyles();
  const styles = createStyles();
  const ColorStyles = getAppsColorStyles();
  const [visibleDetail, setVisibleDetail] = useState(null);

  const dispatch = useDispatch();

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem('passengersToken');
      dispatch(addPassengersToken(null));
      // You might also want to reset other related state
      dispatch(addPassengerStatus(undefined));

      // Optional: Clear all storage if needed
      // await AsyncStorage.clear();

      // Navigate to the initial screen after clearing
    } catch (error) {
      console.error('Failed to clear AsyncStorage:', error);
      // Handle error appropriately
    }
  };
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              clearAsyncStorage(); // Optionally navigate to login or splash screen
              // navigation.replace('Login');
            } catch (e) {
              // handle error if needed
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={barStyles}
        backgroundColor={ColorStyles.backgroundColor}
      />
      <ScrollView style={styles.container}>
        {console.log('visibleDetail', visibleDetail)}
        {visibleDetail == null ? (
          <View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account</Text>
              <SettingsItem
                title="My Profile"
                icon="person-outline"
                navigateTo="profile"
                setVisibleDetail={setVisibleDetail}
              />
            </View>

            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>

            {/* Footer */}
            <Text style={styles.footerText}>
              X Shipment tracking 2024 all rights reserved
            </Text>
          </View>
        ) : visibleDetail == 'profile' ? (
          <ProfileScreen setVisibleDetail={setVisibleDetail} />
        ) : visibleDetail == 'Trip History' ? (
          <TripHistory setVisibleDetail={setVisibleDetail} />
        ) : (
          <View>
            <Text>some text</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const SettingsItem = ({ title, icon, navigateTo, setVisibleDetail }) => {
  const styles = createStyles();

  return (
    <TouchableOpacity
      onPress={() => {
        setVisibleDetail(navigateTo);
        console.log('pressed');
      }}
      style={styles.settingsItem}
    >
      <View style={styles.settingsItemLeft}>
        <Icon name={icon} size={20} color="gray" />
        <Text style={styles.settingsItemText}>{title}</Text>
      </View>
      <Icon name="chevron-forward-outline" size={20} color="gray" />
    </TouchableOpacity>
  );
};

export default SettingsScreen;
