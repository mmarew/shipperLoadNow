import { StyleSheet } from 'react-native';
import ColorStyles from '../../GlobalStyles/Color.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorStyles.backgroundColor,
    marginTop: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  section: {
    backgroundColor: ColorStyles.whiteBGColor,
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemText: {
    fontSize: 16,
    marginLeft: 12,
    color: ColorStyles.textColor,
  },
  logoutButton: {
    backgroundColor: ColorStyles.brandColor,
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 16,
    marginHorizontal: 16,
  },
  logoutButtonText: {
    color: ColorStyles.whiteColor,
    fontSize: 16,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: ColorStyles.errorColor,
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 8,
    marginHorizontal: 16,
  },
  deleteButtonText: {
    color: ColorStyles.errorColor,
    fontSize: 16,
    textAlign: 'center',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: 'gray',
    marginVertical: 16,
  },
});
export default styles;
