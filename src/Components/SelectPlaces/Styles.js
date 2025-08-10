import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes up the full screen
    padding: 15,
    justifyContent: 'space-between', // Distribute space evenly between elements
  },
  buttonContainer: {
    flex: 1,
    position: 'absolute',
    top: 130,
    left: 0,
    right: 0,
    alignItems: 'center', // This will center the button horizontally
  },
  buttonBack: {width: '100%', display: 'block', flex: 1},
  destinationAutoComplete: {
    container: {
      position: 'relative', // Ensure it is positioned relative to its parent
      marginTop: 50, // Give some space between the origin and destination inputs
      zIndex: 3, // Ensure it overlays other elements if necessary
    },
    listView: {
      position: 'absolute', // Position the dropdown absolutely within the container
      top: 40, // Adjust this value based on the height of your input box
      left: 0,
      right: 0,
      zIndex: 4, // Ensure it appears above the back button and other elements
      backgroundColor: '#fff', // Background color for dropdown
      borderWidth: 1,
      borderColor: '#ccc',
    },
  },
  originAutoComplete: {
    container: {
      position: 'relative', // Ensure it is positioned relative to its parent
      zIndex: 5, // Ensure it overlays the destination dropdown and back button
    },
    listView: {
      position: 'absolute', // Position the dropdown absolutely within the container
      top: 40, // Adjust this value based on the height of your input box
      left: 0,
      right: 0,
      zIndex: 6, // Ensure it appears above other elements
      backgroundColor: '#fff', // Background color for dropdown
      borderWidth: 1,
      borderColor: '#ccc',
    },
  },
  placesAutocomplete: {
    textInput: {
      height: 38,
      color: 'black',
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#cccccc',
      borderRadius: 5,
      backgroundColor: '#b1a9a9',
      padding: 5,
      paddingLeft: 10,
      marginTop: 10,
      marginBottom: 5,
    },
    description: {
      color: '#888',
    },
    predefinedPlacesDescription: {
      color: '#1faadb',
    },
    row: {
      margin: 10,
    },
    separator: {
      height: 1,
      backgroundColor: '#efefef',
      marginVertical: 10,
    },
    poweredContainer: {
      display: 'none',
    },
  },
});

export default Styles;
