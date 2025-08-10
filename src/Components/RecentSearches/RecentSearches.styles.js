import { StyleSheet } from 'react-native';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
const createStyles = () => {
  const ColorStyles = getAppsColorStyles();
  const styles = StyleSheet.create({
    recentSearchesContainer: {
      marginTop: 30,
    },

    recentSearchesTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 10,
      color: ColorStyles.textColor,
    },

    recentSearchItem: {
      flexDirection: 'row',
      /* Frame 12230 */
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
