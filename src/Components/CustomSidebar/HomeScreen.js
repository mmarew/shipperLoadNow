// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import CustomSidebar, { CustomsSideBalList } from './CustomSidebar';
import HeaderBar from '../HeaderBar/HeaderBar';

const HomeScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    console.log('@sidebarOpen', sidebarOpen);
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderBar toggleSidebar={toggleSidebar} />

      <MapView
        style={{ flex: 0.5 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      {/* Custom header with menu button */}
      {/* <View style={headerStyles.container}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Text style={headerStyles.menuButton}>☰</Text>
        </TouchableOpacity>
        <Text style={headerStyles.title}>Your App</Text>
      </View> */}
      {/* Custom Sidebar */}
      <CustomsSideBalList
        // navigation={navigation}
        toggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
      />
    </View>
  );
};

export default HomeScreen;
