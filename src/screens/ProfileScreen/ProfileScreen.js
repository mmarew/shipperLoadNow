import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  check,
  request,
  openSettings,
  RESULTS,
  PERMISSIONS,
} from 'react-native-permissions';
import { Text, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import createStyle from './ProfileScreen.css';
import API_URL_AXIOS from '../../services/AxiosServices';
import { requestUsingGetMethode } from '../../utils/handleRequestToServer/handleRequestToServer';
import errorHandler from '../../utils/errorHandler/errorHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import decodeJWT from '../../utils/JWTDecoder/JWTDecoder';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
import getAppsGlobalStyles from '../../GlobalStyles/AppsGlobalStyles';

const ProfileScreen = ({ setVisibleDetail }) => {
  const styles = createStyle();
  const GlobalStyles = getAppsGlobalStyles();
  const ColorStyles = getAppsColorStyles();
  const [userDetails, setUserDetails] = useState({
    fullName: null,
    email: null,
    phoneNumber: null,
  });
  const [profileImage, setProfileImage] = useState(null);
  const [savedProfileImage, setSavedProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passengerDocuments, setPassengerDocuments] = useState([]);
  const [profilePhotoRequirement, setProfilePhotoRequirement] = useState(null);

  // Fetch token and decode user details
  const initializeUserData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('passengersToken');
      if (token) {
        const { data } = decodeJWT(token);
        console.log('@initializeUserData data', data);
        setUserDetails({
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
        });
      }
    } catch (error) {
      console.error('Error initializing user data:', errorHandler(error));
    }
  }, []);
  const [inputsFocus, setInputsFocus] = useState({
    fullName: false,
    email: false,
    phoneNumber: false,
  });

  // Fetch profile image
  const fetchProfileImage = useCallback(async () => {
    try {
      setIsLoading(false);
      // setIsLoading(true);
      const response = await requestUsingGetMethode({
        url: '/api/admin/attachedDocumentsByUser/self',
      });
      const profilePhoto = response?.data?.find(
        doc => doc?.uploadedDocumentName === 'profilePhoto',
      );
      setSavedProfileImage(profilePhoto);
    } catch (error) {
      console.error('Error fetching profile image:', errorHandler(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch passenger document requirements
  const fetchDocumentRequirements = useCallback(async () => {
    try {
      const response = await requestUsingGetMethode({
        url: '/api/user/getMappingByRoleUniqueId/self',
      });
      console.log('@fetchDocumentRequirements response', response);
      setPassengerDocuments(response?.data || []);
    } catch (error) {
      console.error(
        'Error fetching document requirements:',
        errorHandler(error),
      );
    }
  }, []);

  // Identify profile photo requirement
  useEffect(() => {
    console.log('@passengerDocuments', passengerDocuments);
    const requirement = passengerDocuments?.find(
      doc => doc.uploadedDocumentName === 'profilePhoto',
    );
    setProfilePhotoRequirement(requirement || null);
  }, [passengerDocuments]);

  const requestStoragePermission = async () => {
    try {
      let permissionType;

      if (Platform.OS === 'android') {
        permissionType =
          Platform.Version >= 33
            ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES // For Android 13+
            : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE; // For Android 12 and below
      } else {
        permissionType = PERMISSIONS.IOS.PHOTO_LIBRARY;
      }

      const result = await check(permissionType);

      if (result === RESULTS.GRANTED) {
        return true; // Permission is already granted ✅
      } else if (result === RESULTS.DENIED) {
        const requestResult = await request(permissionType);
        return requestResult === RESULTS.GRANTED;
      } else if (result === RESULTS.BLOCKED) {
        Alert.alert(
          'Permission Blocked',
          'You have blocked storage permission. Please enable it in settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => openSettings() },
          ],
        );
        return false;
      } else {
        Alert.alert(
          'Permission Required',
          'Storage permission is required to select files or images.',
          [{ text: 'OK' }],
        );
        return false;
      }
    } catch (error) {
      console.error('Error requesting storage permission:', error);
      return false;
    }
  };

  const handleSelectImage = async () => {
    const hasPermission = await requestStoragePermission();
    if (hasPermission) {
      launchImageLibrary({ mediaType: 'photo' }, response => {
        if (response.assets?.length) {
          setProfileImage(response.assets[0]);
        } else if (response.errorMessage) {
          console.error('ImagePicker Error:', response.errorMessage);
        }
      });
    }
  };

  // Update profile
  const handleUpdateProfile = async () => {
    // return;
    try {
      const formData = new FormData();
      formData.append('fullName', userDetails.fullName);
      formData.append('email', userDetails.email);
      formData.append('phoneNumber', userDetails.phoneNumber);

      if (savedProfileImage?.attachedDocumentUniqueId) {
        formData.append(
          'attachedDocumentUniqueId',
          savedProfileImage.attachedDocumentUniqueId,
        );
      }
      console.log('@handleUpdateProfile profileImage', profileImage);
      if (profileImage) {
        formData.append(profilePhotoRequirement?.uploadedDocumentName, {
          uri: profileImage.uri,
          type: profileImage.type,
          name: profileImage.fileName || 'profile.jpg',
        });
        formData.append(
          profilePhotoRequirement.uploadedDocumentTypeId,
          profilePhotoRequirement.documentTypeId,
        );
      }
      console.log('@handleUpdateProfile formData', formData);

      setIsLoading(true);
      const token = await AsyncStorage.getItem('passengersToken');
      const { data } = await axios.put(
        `${API_URL_AXIOS}/api/user/updateUser/self`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('@handleUpdateProfile data', data);

      if (data.message === 'success') {
        await AsyncStorage.setItem('passengersToken', data.token);
        fetchProfileImage();
        Alert.alert('Success', 'Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', errorHandler(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeUserData();
    fetchDocumentRequirements();
    fetchProfileImage();
  }, [initializeUserData, fetchDocumentRequirements, fetchProfileImage]);

  if (isLoading) return <ActivityIndicator size="large" />;

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: ColorStyles.backgroundColor }}
      extraScrollHeight={150}
      enableOnAndroid={true}
    >
      <View style={styles.container}>
        {/* Header */}
        {setVisibleDetail && (
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisibleDetail(null)}>
              <Icon
                name="arrow-back-outline"
                size={24}
                color={ColorStyles.textColor}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>My Profile</Text>
          </View>
        )}

        {/* Profile Picture */}
        <View style={styles.profileContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage.uri }
                  : savedProfileImage
                  ? {
                      uri: `${API_URL_AXIOS}/uploads/${savedProfileImage.attachedDocumentName}`,
                    }
                  : require('../../assets/icons/userIcon.png')
              }
              style={styles.profileImage}
            />
            <TouchableOpacity
              style={styles.cameraIconContainer}
              onPress={handleSelectImage}
            >
              <Icon name="camera" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.updateText}>Update your photo</Text>
        </View>

        {/* Form Inputs */}
        <View style={styles.inputContainer}>
          <View>
            <TextInput
              outlineStyle={[
                GlobalStyles.inputsOutlineStyle,
                inputsFocus.fullName
                  ? { borderColor: ColorStyles.focused }
                  : {},
              ]}
              activeOutlineColor={ColorStyles.brandColor}
              label={
                <Text
                  style={[
                    GlobalStyles.inputLable,
                    inputsFocus.fullName ? { color: ColorStyles.focused } : {},
                  ]}
                >
                  Full Name
                </Text>
              }
              onBlur={() =>
                setInputsFocus(prev => ({ ...prev, fullName: false }))
              }
              onFocus={() =>
                setInputsFocus(prev => ({ ...prev, fullName: true }))
              }
              contentStyle={GlobalStyles.inputContentstyle}
              mode="outlined"
              style={styles.input}
              value={userDetails?.fullName}
              onChangeText={value =>
                setUserDetails(prev => ({
                  ...prev,
                  fullName: value,
                }))
              }
            />
          </View>
          <View>
            <TextInput
              outlineStyle={[
                GlobalStyles.inputsOutlineStyle,
                inputsFocus.phoneNumber
                  ? { borderColor: ColorStyles.focused }
                  : {},
              ]}
              activeOutlineColor={ColorStyles.brandColor}
              label={
                <Text
                  style={[
                    GlobalStyles.inputLable,
                    inputsFocus.phoneNumber
                      ? { color: ColorStyles.focused }
                      : {},
                  ]}
                >
                  Phone Number
                </Text>
              }
              onBlur={() =>
                setInputsFocus(prev => ({ ...prev, phoneNumber: false }))
              }
              onFocus={() =>
                setInputsFocus(prev => ({ ...prev, phoneNumber: true }))
              }
              contentStyle={GlobalStyles.inputContentstyle}
              mode="outlined"
              style={styles.input}
              value={userDetails?.phoneNumber}
              onChangeText={value =>
                setUserDetails(prev => ({
                  ...prev,
                  phoneNumber: value,
                }))
              }
            />
          </View>
          <View>
            <TextInput
              outlineStyle={[
                GlobalStyles.inputsOutlineStyle,
                inputsFocus.email ? { borderColor: ColorStyles.focused } : {},
              ]}
              activeOutlineColor={ColorStyles.brandColor}
              label={
                <Text
                  style={[
                    GlobalStyles.inputLable,
                    inputsFocus.email ? { color: ColorStyles.focused } : {},
                  ]}
                >
                  Email
                </Text>
              }
              onBlur={() => setInputsFocus(prev => ({ ...prev, email: false }))}
              onFocus={() => setInputsFocus(prev => ({ ...prev, email: true }))}
              contentStyle={GlobalStyles.inputContentstyle}
              mode="outlined"
              style={styles.input}
              value={
                userDetails?.email?.startsWith('fakeEmail_')
                  ? ''
                  : userDetails?.email
              }
              onChangeText={value =>
                setUserDetails(prev => ({
                  ...prev,
                  email: value,
                }))
              }
            />
          </View>
        </View>

        {/* Update Profile Button */}
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateProfile}
        >
          <Text style={styles.updateButtonText}>Update Profile </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ProfileScreen;
