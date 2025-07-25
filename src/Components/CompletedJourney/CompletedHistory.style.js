// File: HistoryScreenStyles.js

import { StyleSheet } from 'react-native';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
const createStyles = () => {
  const ColorStyles = getAppsColorStyles();
  return StyleSheet.create({
    container: {
      padding: 15,
    },
    checkboxRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    checkboxGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginRight: 20,
    },
    checkboxContainer: {
      backgroundColor: ColorStyles.whiteColor,
      borderRadius: 4,
      padding: 0,
      alignSelf: 'flex-start',
    },
    checkboxLabel: {
      color: ColorStyles.textColor,
    },
    dateRangeContainer: {
      gap: 20,
    },
  });
};
export default createStyles;
