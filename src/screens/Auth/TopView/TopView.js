import React from 'react';
import { Text, View } from 'react-native';
import Elipse24 from '../../../assets/icons/Ellipse_24.svg';
import Elipse25 from '../../../assets/icons/Ellipse_25.svg';
import styles from './TopView.css';
import { height } from '../../../Components/Constants/constant.utils';
const TopView = ({ title, description }) => {
  return (
    <View style={styles.topSection}>
      <View style={styles.Elipse24}>
        <Elipse24 height={height * 0.5} />
      </View>
      <View style={styles.Elipse25}>
        <Elipse25 height={height * 0.5} />
      </View>
      <View style={styles.textsWrapper}>
        <Text style={styles.registerTitle}>{title}</Text>
        <Text style={styles.subtitle}>{description}</Text>
      </View>
    </View>
  );
};

export default TopView;
