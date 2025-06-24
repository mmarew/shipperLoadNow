import {StyleSheet} from 'react-native';

const GlobalStyles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    overflow: 'scroll',
    paddingBottom: 90,
    flex: 1,
  },
  // Input fields styling
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    fontSize: 16,
    marginBottom: 15,
  },

  // Label styling
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },

  // Button styling
  button: {
    backgroundColor: '#075985',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
    paddingHorizontal: 7,
    flexGrow: 1,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },

  // Checkbox styling
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingRight: 15,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
    paddingRight: 5,
    backgroundColor: 'transparent', // Default background color
  },
  checkboxChecked: {
    backgroundColor: '#075985',
  },

  // Error Text styling
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  textLink: {
    color: '#075985',
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  title: {
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    color: '#27272A',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 19,
  },
  bodyBasicBgColor: {
    backgroundColor: '#F4F4F5',
  },

  bodyWhiteBackgroundColor: {backgroundColor: '#ffffff'},
});

export default GlobalStyles;
