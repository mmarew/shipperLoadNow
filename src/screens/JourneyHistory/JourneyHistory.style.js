import { StyleSheet } from 'react-native';
import ColorStyles from '../../GlobalStyles/Color.styles';

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorStyles.backgroundColor,
    marginTop: 90,
  },
  screenContainer: { flex: 1, backgroundColor: ColorStyles.backgroundColor },
  // Tab Bar Styles
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#222',
    paddingVertical: 12,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabText: {
    fontSize: 16,
    color: ColorStyles.textColor,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: ColorStyles.borderColor,
  },
  activeText: {
    color: ColorStyles.brandColor,
    fontWeight: 'bold',
  },
});
export default styles;
