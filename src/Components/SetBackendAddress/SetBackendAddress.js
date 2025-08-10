import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Text, TextInput} from 'react-native-paper';

const SetBackendAddress = () => {
  const [backendUrl, setBackendUrl] = useState('');
  const [savedUrl, setSavedUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Load saved URL from local storage on component mount
  useEffect(() => {
    const fetchSavedUrl = async () => {
      try {
        const url = await AsyncStorage.getItem('backendUrl');
        if (url) {
          setSavedUrl(url);
        }
      } catch (error) {
        console.error('Error fetching saved URL:', error);
      }
    };

    fetchSavedUrl();
  }, []);

  // Validate URL format
  const isValidUrl = url => {
    const urlPattern =
      /^(https?:\/\/)([\w\-]+(\.[\w\-]+)+)(:[0-9]{1,5})?(\/.*)?$/;
    return urlPattern.test(url);
  };

  // Save URL to local storage
  const saveUrlToLocalStorage = async () => {
    if (!isValidUrl(backendUrl)) {
      setErrorMessage('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    try {
      await AsyncStorage.setItem('backendUrl', backendUrl);
      setSavedUrl(backendUrl); // Update the saved URL display
      setBackendUrl(''); // Clear the input
      setErrorMessage(''); // Clear any error messages
    } catch (error) {
      console.error('Error saving URL:', error);
    }
  };

  // Update input field when clicking on the saved URL
  const handleSavedUrlClick = () => {
    setBackendUrl(savedUrl);
  };

  return (
    <View style={{padding: 10, marginTop: 300, gap: 20}}>
      {savedUrl ? (
        <TouchableOpacity onPress={handleSavedUrlClick}>
          <Text style={{color: 'blue', marginBottom: 10}}>
            Saved URL: {savedUrl}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={{marginBottom: 10}}>No URL saved yet</Text>
      )}

      <TextInput
        mode="outlined"
        label="Type backend URL"
        value={backendUrl}
        onChangeText={text => setBackendUrl(text)}
        error={!!errorMessage} // Highlight input field if there's an error
      />
      {errorMessage ? (
        <Text style={{color: 'red', marginBottom: 10}}>{errorMessage}</Text>
      ) : null}

      <Button
        mode="contained"
        style={{marginTop: 10}}
        onPress={saveUrlToLocalStorage}>
        Save
      </Button>
    </View>
  );
};

export default SetBackendAddress;
