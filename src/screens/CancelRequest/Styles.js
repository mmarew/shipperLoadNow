import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  modalContainer: {
    backgroundColor: '#f4f4f5',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    marginTop: 90,
  },
  indicator: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginVertical: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reasonButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  reasonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  selectedReasonContainer: {
    backgroundColor: '#d3d3d3',
  },
  reasonText: {
    fontSize: 16,
    color: '#333',
  },
});
export default styles;
