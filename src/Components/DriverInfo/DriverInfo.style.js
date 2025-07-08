import { StyleSheet } from 'react-native';
import ColorStyles from '../../GlobalStyles/Color.styles';

const styles = StyleSheet.create({
  headingText: {
    paddingTop: 10,
    paddingBottom: 15,
    color: ColorStyles.textColor,
  },
  timeDisplayer: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: ColorStyles.textColor,
  },
  arrivalText: {
    color: ColorStyles.textColor,
    marginTop: 5,
  },
  vehicleInfoText: {
    marginVertical: 10,
    color: ColorStyles.textColor,
  },
  journeyInfoWrapper: {
    borderColor: ColorStyles.borderColor,
    borderBottomWidth: 2,
    paddingLeft: 30,
    backgroundColor: ColorStyles.whiteBGColor,
    borderRadius: 20,
    paddingVertical: 20,
    marginTop: -2,
  },

  cardContainer: {
    marginVertical: 15,
    backgroundColor: ColorStyles.whiteBGColor,

    justifyContent: 'center',
    borderRadius: 20,
  },
  cardProfileContainer: { flexDirection: 'row', alignItems: 'center' },
  shipingCost: { paddingLeft: 10 },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 10,
  },
  driverInfo: {
    flex: 1,
    // paddingBottom: 20,
  },
  driverName: {
    fontSize: 20,
    color: ColorStyles.textColor,
  },
  memberSince: {
    color: ColorStyles.textColor,
  },
  deliveryInfo: {
    fontSize: 12,
    color: '#6b7280',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#4b5563',
  },
  callButton: {
    backgroundColor: '#f0f9ff',
    padding: 8,
    borderRadius: 25,
  },
  driverInfoContainer: {
    width: '100%',
    paddingTop: 10,
    backgroundColor: ColorStyles.backgroundColor,
  },
});
export default styles;
