import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
import fontFamily from '../../GlobalStyles/FontFamily';

// Enable animation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const privacySections = [
  {
    title: '1. What Information We Collect',
    content:
      'We collect your name, phone number, email address, shipment details, pickup and drop-off addresses, payment method, and device information.',
  },
  {
    title: '2. How We Use Your Information',
    content:
      'We use your data to match you with available drivers, process payments, track shipments, and improve our services.',
  },
  {
    title: '3. Sharing of Information',
    content:
      'We share shipment details only with assigned drivers. We do not sell your personal information to third parties.',
  },
  {
    title: '4. Data Security',
    content:
      'We use encryption and secure storage to protect your data. Access is restricted to authorized personnel only.',
  },
  {
    title: '5. Your Rights',
    content:
      'You may request to view, update, or delete your data at any time by contacting support@yourapp.com.',
  },
  {
    title: '6. Changes to This Policy',
    content:
      'We may update this policy as needed. You will be notified in-app or via email before any major changes take effect.',
  },
];

const PrivacyPolicyScreen = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const styles = createStyles();
  const toggleSection = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <Text style={styles.header}>Privacy Policy</Text>
      <Text style={styles.subtext}>
        Learn how we collect, use, and protect your information as a shipper.
      </Text>

      {privacySections.map((section, index) => (
        <View key={index} style={styles.card}>
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() => toggleSection(index)}
          >
            <Icon
              name={activeIndex === index ? 'chevron-down' : 'chevron-right'}
              size={14}
              color="#007bff"
            />
            <Text style={styles.cardTitle}>{section.title}</Text>
          </TouchableOpacity>

          {activeIndex === index && (
            <Text style={styles.cardContent}>{section.content}</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default PrivacyPolicyScreen;
const createStyles = () => {
  const colorStyles = getAppsColorStyles();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorStyles.backgroundColor,
      fontFamily: fontFamily.manropeRegular,
    },
    scroll: {
      padding: 20,
      paddingBottom: 40,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colorStyles.textColor,
      fontFamily: fontFamily.manropeRegular,

      marginBottom: 8,
    },
    subtext: {
      fontSize: 14,
      color: colorStyles.textColor,
      fontFamily: fontFamily.manropeRegular,

      marginBottom: 20,
    },
    card: {
      backgroundColor: colorStyles.whiteBGColor,
      fontFamily: fontFamily.manropeRegular,

      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      elevation: 1,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardTitle: {
      fontSize: 15,
      fontWeight: '600',
      marginLeft: 10,
      fontFamily: fontFamily.manropeRegular,

      color: colorStyles.textColor,
    },
    cardContent: {
      marginTop: 10,
      fontSize: 14,
      color: colorStyles.textColor,
      fontFamily: fontFamily.manropeRegular,
      lineHeight: 20,
    },
  });
  return styles;
};
