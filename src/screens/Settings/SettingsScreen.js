import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Switch } from 'react-native-switch';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import styles from './Settings.css';
import TripHistory from '../../Components/TripHistory/TripHistory';
import { navigate } from '../../services/navigationService';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderBar from '../../Components/HeaderBar/HeaderBar';
const SettingsScreen = ({ navigation }) => {
  const [visibleDetail, setVisibleDetail] = useState(null);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <HeaderBar navigation={navigation} /> */}
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView style={styles.container}>
        {console.log('visibleDetail', visibleDetail)}
        {visibleDetail == null ? (
          <View>
            {/* Account Section */}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account</Text>

              <SettingsItem
                title="My Profile"
                icon="person-outline"
                navigateTo="profile"
                setVisibleDetail={setVisibleDetail}
              />

              {/* <SettingsItem
              setVisibleDetail={setVisibleDetail}
              title="Trip History"
              icon="time-outline"
              navigateTo={'Trip History'}
            /> */}
              {/* <SettingsItem title="Favorite Locations" icon="location-outline" /> */}
            </View>

            {/* Logout and Delete Account */}
            <TouchableOpacity
              onPress={async () => {
                // navigate('Logout');
              }}
              style={styles.logoutButton}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity> */}

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

const SettingsItem = ({ title, icon, navigateTo, setVisibleDetail }) => (
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

const SettingsToggle = ({ title, icon, value, onValueChange }) => (
  <View style={styles.settingsItem}>
    <View style={styles.settingsItemLeft}>
      <Icon name={icon} size={20} color="gray" />
      <Text style={styles.settingsItemText}>{title}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      activeText={''}
      inActiveText={''}
      circleSize={20}
      barHeight={20}
      backgroundActive={'#4cd964'}
      backgroundInactive={'#ccc'}
      circleBorderWidth={0}
    />
  </View>
);

export default SettingsScreen;
