import React, { useState } from 'react';
import HomeScreen from '../Home/HomeScreen';
import HeaderBar from '../../Components/HeaderBar/HeaderBar';
import { CustomsSideBarList } from '../../Components/CustomSidebar/CustomSidebar';
import { SafeAreaView } from 'react-native-safe-area-context';
import TripHistory from '../JourneyHistory/JourneyHistory';
import SettingsScreen from '../Settings/SettingsScreen';
import Reload from '../../Components/Reload/Reload';
import { useSelector } from 'react-redux';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
export default function CustomScreenManager({ savedProfileImage }) {
  const ColorStyles = getAppsColorStyles();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [selectedScreen, setSelectedScreen] = useState('Home');
  const selectedScreen = useSelector(
    state => state.passengerSlices.selectedScreen,
  );

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const sidebarItems = [
    { label: 'Home', screen: 'Home' },
    { label: 'Trip History', screen: 'Trip History' },
    { label: 'Settings', screen: 'Settings' },
    { label: 'Reload', screen: 'Reload' },
  ];
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          height: '100%',
          position: 'relative',
          backgroundColor: ColorStyles.backgroundColor,
        }}
      >
        <HeaderBar toggleSidebar={toggleSidebar} />
        {selectedScreen == 'Home' ? (
          <HomeScreen />
        ) : selectedScreen == 'Trip History' ? (
          <TripHistory />
        ) : selectedScreen == 'Settings' ? (
          <SettingsScreen />
        ) : selectedScreen == 'Reload' ? (
          <Reload />
        ) : (
          <Text>Screen not found</Text>
        )}
        {/* Reload */}
      </SafeAreaView>
      <CustomsSideBarList
        sidebarItems={sidebarItems}
        selectedScreen={selectedScreen}
        savedProfileImage={savedProfileImage}
        // setSelectedScreen={setSelectedScreen}
        // navigation={navigation}
        toggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
      />
    </>
  );
}
