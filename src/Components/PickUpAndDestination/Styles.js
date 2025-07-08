import { StyleSheet } from 'react-native';
import ColorStyles from '../../GlobalStyles/Color.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorStyles.backgroundColor,
    padding: 20,
    position: 'relative',
  },

  // LABEL
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: ColorStyles.textColor,
    marginLeft: 45,
  },

  // INPUT CARD WRAPPER
  locationCard: {
    position: 'absolute',

    zIndex: 10,

    top: 69,
  },
  cardInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconLeft: {
    marginLeft: 10,
    marginTop: -9,
  },

  // INPUT FIELD
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
  },
  cardInputText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },

  // AUTOCOMPLETE
  autocompleteWrapper: {
    flex: 1,
    marginLeft: 5,
    // zIndex: 9,
  },

  // CLEAR ICON
  clearIcon: {
    position: 'absolute',
    right: 15,
    top: 80,
    zIndex: 10,
  },

  // LIST CONTAINER (FOR FlatList)
  listContainer: {
    paddingBottom: 80,
  },
});

export default styles;
