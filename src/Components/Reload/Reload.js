import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import RNRestart from 'react-native-restart';

const Reload = ({ navigation }) => {
  const reloadApp = () => {
    RNRestart?.restart();
  };
  useEffect(() => {
    reloadApp();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity>
        <Text>Reloading ...... </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Reload;
