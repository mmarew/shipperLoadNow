BackArrow;
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './BackArrow.style';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BackArrow = ({ description, setShowComponent, showComponent }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.headerWrapper}
        onPress={() => {
          if (typeof setShowComponent === 'function')
            setShowComponent(showComponent);
        }}
      >
        <Ionicons name="arrow-back-outline" size={24} color="black" />
        <Text style={styles.headerTitle}>{description}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackArrow;
