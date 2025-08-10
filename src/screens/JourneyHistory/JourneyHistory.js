import React, { useState } from 'react';
import { View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import CurrentScreen from '../../Components/CompletedJourney/CompletedCurrent';
import HistoryScreen from '../../Components/CompletedJourney/CompletedHistory';
import { SafeAreaView } from 'react-native-safe-area-context';
import ColorStyles from '../../GlobalStyles/Color.styles';
import { getAppsBarStyles } from '../../GlobalStyles/AppsColorStyles';
import { Text } from 'react-native-paper';
import createStyles from './JourneyHistory.style';
const JourneyCompleted = ({ navigation }) => {
  const styles = createStyles();

  const barStyles = getAppsBarStyles();
  const passengerSlices = useSelector(state => state.passengerSlices);
  const passengerStatus = passengerSlices?.passengerStatus;
  const listofJourneyStatus = passengerSlices?.listofJourneyStatus;
  console.log('@listofJourneyStatus', listofJourneyStatus?.journeyCompleted);
  const [activeTab, setActiveTab] = useState(
    passengerStatus == listofJourneyStatus?.journeyCompleted
      ? 'Current'
      : 'History',
  );

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={barStyles}
        backgroundColor={ColorStyles.backgroundColor}
      />
      <ScrollView>
        <View style={styles.container}>
          {/* Render Active Screen */}
          <View style={styles.screenContainer}>
            {activeTab === 'Current' ? <CurrentScreen /> : <HistoryScreen />}
          </View>

          {/* Custom Tabs */}
          <View style={styles.tabBar}>
            <TabButton
              title="Current"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <TabButton
              title="History"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Custom Tab Button Component
const TabButton = ({ title, activeTab, setActiveTab }) => {
  const styles = createStyles();
  return (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === title ? styles.activeTab : {}]}
      onPress={() => setActiveTab(title)}
    >
      <Text
        style={[styles.tabText, activeTab === title ? styles.activeText : {}]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default JourneyCompleted;
