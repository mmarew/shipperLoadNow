import { TouchableOpacity, View } from 'react-native';
import createStyles from './HeaderBar.style';

const HeaderBar = ({ toggleSidebar }) => {
  const styles = createStyles();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => {
          console.log('@toggleSidebar');
          toggleSidebar();
        }}
        activeOpacity={0.7}
        accessibilityLabel="Open drawer menu"
        accessibilityRole="button"
      >
        <View style={styles.hamburger}>
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderBar;
