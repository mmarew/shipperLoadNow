import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    height: 400,
    backgroundColor: 'black',
    marginBottom: -30,
  },
  nonMap: { height: height * 0.2 },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: '100%',
    padding: 20,
  },
  messageContainer: {
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: '100%',
    padding: 20,
  },
  requestContainer: {
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: '100%',
    padding: 20,
  },
  acceptButton: {
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  rejectButton: {
    backgroundColor: '#DC3545',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
  },
});

export const customMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#1a2233' }], // deep blue-black
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8ecae6' }], // light blue for text
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#1a2233' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#222b44' }], // blue-black for water
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#223355' }], // blue-black for roads
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#1a2233' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#1a2233' }],
  },
];

export default styles;
