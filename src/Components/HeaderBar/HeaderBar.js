import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import HeaderIcon from '../../assets/icons/HeaderIcon.svg';
import styles from './HeaderBar.style';

const HeaderBar = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.openDrawer()}
        accessibilityLabel="Open drawer menu"
        accessibilityRole="button">
        <HeaderIcon />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HeaderBar;
