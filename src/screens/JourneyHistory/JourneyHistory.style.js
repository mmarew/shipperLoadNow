import {StyleSheet} from 'react-native';

// Styles
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f5f5', marginTop: 90},
  screenContainer: {flex: 1},
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
    color: '#aaa',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'tomato',
  },
  activeText: {
    color: 'tomato',
    fontWeight: 'bold',
  },
});
export default styles;
