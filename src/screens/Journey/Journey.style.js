import { StyleSheet } from 'react-native';
const createStyles = () => {
  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      flex: 1,
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
  });
  return styles;
};
export default createStyles;
