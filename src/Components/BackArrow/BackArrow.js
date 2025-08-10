BackArrow;
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './BackArrow.style';
// import ColorStyles from '../../GlobalStyles/Color.styles';
import IconAwesome from '../Common/CustomFontAwesome/IconAwesome';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
import createStyles from './BackArrow.style';
const BackArrow = ({ description, setShowComponent, showComponent }) => {
  const ColorStyles = getAppsColorStyles();
  const styles = createStyles();
  return (
    <View>
      <TouchableOpacity
        style={styles.headerWrapper}
        onPress={() => {
          if (typeof setShowComponent === 'function')
            setShowComponent(showComponent);
        }}
      >
        <IconAwesome
          name={'arrow-left'}
          color={ColorStyles.textColor}
          size={20}
        />

        <Text style={styles.headerTitle}>{description}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackArrow;
