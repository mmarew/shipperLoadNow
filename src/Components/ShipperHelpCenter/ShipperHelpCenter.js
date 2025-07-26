import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';

const helpTopics = [
  {
    title: 'How to create a shipment?',
    icon: 'box-open',
    content:
      'To create a shipment, go to the “New Shipment” tab, fill out pickup and drop-off details, item description, and submit.',
  },
  {
    title: 'Track your shipment',
    icon: 'map-marker-alt',
    content:
      'You can track your shipment in real-time from the “My Shipments” tab. Tap any shipment to view live tracking.',
  },
  {
    title: 'Payment and receipts',
    icon: 'credit-card',
    content:
      'We accept card, cash, or digital wallet. After delivery, a receipt is emailed and viewable under “Payment History.”',
  },
  {
    title: 'Cancel a shipment',
    icon: 'times-circle',
    content:
      'You can cancel a shipment before pickup by opening the shipment details and tapping “Cancel Shipment.”',
  },
  {
    title: 'Report a problem',
    icon: 'exclamation-triangle',
    content:
      'If there was an issue with a shipment, go to Help > Report a Problem and describe the issue clearly.',
  },
];

const ShipperHelpCenter = () => {
  const styles = createStyles();
  const handleContactSupport = () => {
    Linking.openURL('mailto:support@yourapp.com?subject=Shipper Support');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <Text style={styles.header}>Help Center</Text>
      <Text style={styles.subtext}>
        Find answers to common shipper questions
      </Text>

      {helpTopics.map((topic, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name={topic.icon} size={18} color="#007bff" solid />
            <Text style={styles.cardTitle}>{topic.title}</Text>
          </View>
          <Text style={styles.cardContent}>{topic.content}</Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.contactButton}
        onPress={handleContactSupport}
      >
        <Icon
          name="headset"
          size={18}
          color="white"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.contactText}>Contact Support</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ShipperHelpCenter;
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
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: ColorStyles.textColor,
      marginBottom: 8,
    },
    subtext: {
      fontSize: 14,
      color: ColorStyles.textColor,
      marginBottom: 20,
    },
    card: {
      backgroundColor: ColorStyles.whiteBGColor,
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      elevation: 2,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 10,
      color: ColorStyles.textColor,
    },
    cardContent: {
      fontSize: 14,
      color: ColorStyles.textColor,
    },
    contactButton: {
      marginTop: 20,
      backgroundColor: ColorStyles.brandColor,
      borderRadius: 10,
      paddingVertical: 14,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    contactText: {
      color: ColorStyles.whiteColor,
      fontWeight: '600',
      fontSize: 16,
    },
  });
  return styles;
};
