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
      width: 40,
      height: 40,
      padding: 0,
      margin: 0,
      backgroundColor: ColorStyles.whiteColor,
      borderRadius: 4,
      alignSelf: 'flex-start',
      borderWidth: 4,
      borderColor: ColorStyles.borderColor,
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
