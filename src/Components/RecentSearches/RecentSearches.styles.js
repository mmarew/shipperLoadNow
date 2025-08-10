import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  recentSearchesContainer: {
    marginTop: 30,
  },

  recentSearchesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },

  recentSearchItem: {
    flexDirection: 'row',
    /* Frame 12230 */
    alignItems: 'center',
    gap: 5,
    paddingLeft: 13,
    height: 63,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
    alignSelf: 'stretch',
  },

  recentSearchText: {
    fontSize: 15,
    marginLeft: 15,
    color: '#333',
  },
});
export default styles;
