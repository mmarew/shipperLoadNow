import React, { useState } from 'react';
import HomeScreen from '../../Home/HomeScreen';
import HeaderBar from '../../../Components/HeaderBar/HeaderBar';
import { CustomsSideBarList } from '../../../Components/CustomSidebar/CustomSidebar';
import { SafeAreaView } from 'react-native-safe-area-context';
import TripHistory from '../../../screens/JourneyHistory/JourneyHistory';
import SettingsScreen from '../../Settings/SettingsScreen';
import Reload from '../../../Components/Reload/Reload';

export default function CustomScreenManager({ savedProfileImage }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState('Home');
  const toggleSidebar = () => {
    console.log('@sidebarOpen', sidebarOpen);
    setSidebarOpen(!sidebarOpen);
  };
  console.log('@selectedScreen', selectedScreen);
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          height: '100%',
          position: 'relative',
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
        savedProfileImage={savedProfileImage}
        setSelectedScreen={setSelectedScreen}
        // navigation={navigation}
        toggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
      />
    </>
  );
}
