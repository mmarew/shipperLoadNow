import { TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './PickupAndDestinationDisplayer.style';
import { Text } from 'react-native-paper';
import GlobalStyles from '../../GlobalStyles/GlobalStyles';
import ColorStyles from '../../GlobalStyles/Color.styles';

const PickupAndDestinationDisplayer = ({
  setShowComponent,
  showComponent,

  listOfJourneyPoints = [],
  disableInnerTouchables = false, // Add this prop
}) => {
  const navigateToChoosePlaces = ({ focus }) => {
    if (!showComponent) return;
    if (typeof setShowComponent === 'function') setShowComponent(showComponent);
  };
  return (
    <View style={{ ...styles.container }}>
      {/* Radio Buttons */}
      {listOfJourneyPoints.map((points, index) => {
        const { origin, destination } = points;
        // console.log('@points', points);
        return (
          <View key={index} style={{ marginTop: 20 }}>
            {origin?.shippingDate && (
              <Text style={{ margin: 20, marginBottom: 10 }}>
                {formatDate(origin.shippingDate)}
              </Text>
            )}
            {disableInnerTouchables ? (
              <>
                <View
                  style={{
                    ...styles.pickAndDestination,
                    ...styles.pickUp,
                  }}
                >
                  <Ionicons
                    name="radio-button-on-outline"
                    size={10}
                    color="dodgerblue"
                  />
                  <View>
                    <Text style={{ color: ColorStyles.whiteColor }}>From</Text>
                    <Text style={styles.textPickupAndDestination}>
                      {origin?.description ? origin?.description : 'Set Pickup'}
                    </Text>
                  </View>
                </View>

                <View
                  onPress={() =>
                    navigateToChoosePlaces({ focus: 'focus on destination' })
                  }
                >
                  <View
                    style={{
                      ...styles.pickAndDestination,
                      ...styles.destination,
                    }}
                  >
                    <Ionicons
                      name="radio-button-on-outline"
                      size={10}
                      color="dodgerblue"
                    />

                    <View>
                      <Text style={{ color: ColorStyles.whiteColor }}>To </Text>
                      <Text style={styles.textPickupAndDestination}>
                        {destination?.description
                          ? destination?.description
                          : 'Set destination'}
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() =>
                    navigateToChoosePlaces({ focus: 'focus on pick up' })
                  }
                >
                  {/* Pick and Destination */}
                  <View
                    style={{ ...styles.pickAndDestination, ...styles.pickUp }}
                  >
                    <Ionicons
                      name="radio-button-on-outline"
                      size={10}
                      color="dodgerblue"
                    />

                    <View>
                      <Text style={{ color: ColorStyles.whiteColor }}>
                        From
                      </Text>
                      <Text style={styles.textPickupAndDestination}>
                        {origin?.description
                          ? origin?.description
                          : 'Set Pickup'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigateToChoosePlaces({ focus: 'focus on destination' })
                  }
                >
                  <View
                    style={{
                      ...styles.pickAndDestination,
                      ...styles.destination,
                    }}
                  >
                    <Ionicons
                      name="radio-button-on-outline"
                      size={10}
                      color="dodgerblue"
                    />

                    <View>
                      <Text style={{ color: ColorStyles.whiteColor }}>To </Text>
                      <Text style={styles.textPickupAndDestination}>
                        {destination?.description
                          ? destination?.description
                          : 'Set destination'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        );
      })}
    </View>
  );
};
const formatDate = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export default PickupAndDestinationDisplayer;
