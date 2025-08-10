import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 20,
  },

  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
  },
  checkboxBox: {
    flex: 1,
  },
  checkboxChecked: {
    backgroundColor: '#075985',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 23,
  },
  termsLink: {
    color: '#075985',
    textDecorationLine: 'underline',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
export default styles;
