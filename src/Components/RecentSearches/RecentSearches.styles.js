import { StyleSheet } from 'react-native';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
const createStyles = () => {
  const ColorStyles = getAppsColorStyles();
  const styles = StyleSheet.create({
    recentSearchesContainer: {
      marginTop: -10,
    },

    recentSearchesTitle: {
      fontSize: 12,
      fontWeight: '500',
      marginBottom: 10,
      color: ColorStyles.inputLabelsColor,
    },

    recentSearchItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingLeft: 13,
      height: 63,
      backgroundColor: ColorStyles.whiteBGColor,
      borderBottomWidth: 1,
      borderBottomColor: ColorStyles.borderColor,
      alignSelf: 'stretch',
    },

    recentSearchText: {
      fontSize: 15,
      marginLeft: 15,
      color: ColorStyles.textColor,
      flexWrap: 'wrap',
      width: '90%',
    },
  });
  return styles;
};
export default createStyles;
