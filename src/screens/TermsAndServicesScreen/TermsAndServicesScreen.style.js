import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  contentContainer: {
    marginBottom: 100,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333333',
  },
  agreeButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    alignItems: 'center',
    margin: 20,
    borderRadius: 5,
  },
  agreeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default styles;
