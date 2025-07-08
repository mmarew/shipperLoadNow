import { StyleSheet } from 'react-native';
import ColorStyles from '../../GlobalStyles/Color.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorStyles.backgroundColor,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    width: '100%',
    backgroundColor: ColorStyles.backgroundColor,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: ColorStyles.textColor,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  imageWrapper: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#e1e1e1',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 13,
    right: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 5,
  },
  updateText: {
    marginTop: 12,
    fontSize: 16,
    color: '#8e8e93',
  },
  inputContainer: {
    width: '90%',
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    color: '#8e8e93',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
  },
  updateButton: {
    backgroundColor: '#005f8f',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 30,
    width: '90%',
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
module.exports = styles;
