import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Clipboard from '@react-native-clipboard/clipboard';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
import fontFamily from '../../GlobalStyles/FontFamily';

const InviteFriendsScreen = () => {
  const styles = createStyles();
  const inviteMessage = `🚚 Join X Shipper App and ship smarter!
Get fast, reliable delivery with just a few taps. 
Use my code *SHIP123* to sign up and get a bonus!`;

  const handleShare = async () => {
    try {
      await Share.share({
        message: inviteMessage,
      });
    } catch (error) {
      Alert.alert('Sharing failed', error.message);
    }
  };

  const copyCode = () => {
    Clipboard.setString('SHIP123');
    Alert.alert('Copied', 'Your invite code has been copied!');
  };

  return (
    <View style={styles.container}>
      <Icon name="users" size={40} color="#007bff" style={styles.icon} />
      <Text style={styles.title}>Invite Your Friends</Text>
      <Text style={styles.subtitle}>
        Share the app with your friends and help them get started. You may both
        earn bonuses!
      </Text>

      <View style={styles.codeContainer}>
        <Text style={styles.code}>SHIP123</Text>
        <TouchableOpacity onPress={copyCode} style={styles.copyButton}>
          <Icon name="copy" size={16} color="#007bff" />
          <Text style={styles.copyText}>Copy</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Icon
          name="share-alt"
          size={18}
          color="white"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.shareText}>Share Invite</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InviteFriendsScreen;
const createStyles = () => {
  const ColorStyles = getAppsColorStyles();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: ColorStyles.backgroundColor,
      padding: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      marginBottom: 20,
    },
    title: {
      fontFamily: fontFamily.manropeRegular,
      fontSize: 22,
      fontWeight: '700',
      color: ColorStyles.textColor,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 14,
      fontFamily: fontFamily.manropeRegular,

      color: ColorStyles.textColor,
      textAlign: 'center',
      marginBottom: 25,
    },
    codeContainer: {
      backgroundColor: ColorStyles.backgroundColor,
      borderRadius: 10,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
    },
    code: {
      fontSize: 18,
      fontWeight: '600',
      fontFamily: fontFamily.manropeRegular,

      color: ColorStyles.brandColor,
      marginRight: 15,
    },
    copyButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    copyText: {
      marginLeft: 5,
      fontFamily: fontFamily.manropeRegular,

      color: ColorStyles.brandColor,
      fontWeight: '500',
    },
    shareButton: {
      fontFamily: fontFamily.manropeRegular,

      backgroundColor: ColorStyles.brandColor,
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    shareText: {
      fontFamily: fontFamily.manropeRegular,

      color: ColorStyles.whiteColor,
      fontSize: 16,
      fontWeight: '600',
    },
  });
  return styles;
};
