import { TouchableOpacity } from 'react-native';
import HeaderIcon from '../../assets/icons/HeaderIcon.svg';
import styles from './HeaderBar.style';
const HeaderBar = ({ toggleSidebar }) => {
  return (
    <TouchableOpacity
      style={styles.header}
      onPress={() => {
        toggleSidebar();
      }}
      accessibilityLabel="Open drawer menu"
      accessibilityRole="button"
    >
      <HeaderIcon width={150} height={150} left={13} top={12} />
    </TouchableOpacity>
  );
};

export default HeaderBar;
