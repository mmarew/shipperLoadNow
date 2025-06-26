import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import styles from './JourneyHistory.style';
import CurrentScreen from '../../Components/CompletedJourney/CompletedCurrent';
import HistoryScreen from '../../Components/CompletedJourney/CompletedHistory';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderBar from '../../Components/HeaderBar/HeaderBar';

const JourneyCompleted = ({ navigation }) => {
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
      <HeaderBar navigation={navigation} />
      <StatusBar barStyle="dark-content" backgroundColor="white" />
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
const TabButton = ({ title, activeTab, setActiveTab }) => (
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

export default JourneyCompleted;
