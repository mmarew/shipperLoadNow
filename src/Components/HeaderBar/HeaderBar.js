import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderIcon from '../../assets/icons/HeaderIcon.svg';
import styles from './HeaderBar.style';
import { updateCurrentLocation } from '../../Redux/slices/PassengerSlice';
import store from '../../Redux/Store/Store';

const HeaderBar = ({ navigation }) => {
  // const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => {
          store.dispatch(updateCurrentLocation(null));
          navigation.openDrawer();
        }}
        accessibilityLabel="Open drawer menu"
        accessibilityRole="button"
      >
        <HeaderIcon />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HeaderBar;
