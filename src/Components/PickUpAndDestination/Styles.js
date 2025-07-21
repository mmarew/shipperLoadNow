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
  },

  // INPUT CARD WRAPPER
  locationCard: {
    position: 'relative',
    marginBottom: 20,
  },
  cardInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
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
  },

  // CLEAR ICON
  clearIcon: {
    position: 'absolute',
    right: 15,
    top: 80,
    zIndex: 1000,
  },

  // LIST CONTAINER (FOR FlatList)
  listContainer: {
    paddingBottom: 80,
  },
  pickupInputContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 8,
    backgroundColor: ColorStyles.backgroundColor,
    width: '100%',
  },
  destinationInputContainer: {
    zIndex: 7,
    position: 'absolute',
    top: 20,
    width: '100%',
  },
});

export default styles;
