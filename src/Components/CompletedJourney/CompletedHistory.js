// import { ScrollView, TouchableOpacity, View } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';

// import { requestUsingGetMethod } from '../../utils/handleRequestToServer/handleRequestToServer';
// import { useEffect, useState } from 'react';
// import PickupAndDestinationDisplayer from '../PickUpAndDestination/PickupAndDestinationDisplayer';
// import {
//   ActivityIndicator,
//   Checkbox,
//   Text,
//   TextInput,
// } from 'react-native-paper';
// import { convertToYMDHMSFormat } from '../../utils/TimeDateHandler/TimeDateHandler';
// import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
// import getAppsGlobalStyles from '../../GlobalStyles/AppsGlobalStyles';

// const CompletedHistory = () => {
//   const GlobalStyles = getAppsGlobalStyles();
//   const [listOfJourney, setlistOfJourney] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [dateRange, setDateRange] = useState({
//     fromDate: new Date(),
//     toDate: new Date(),
//     showFromDate: false,
//     showToDate: false,
//   });
//   const [fetchDataByRange, setfetchDataByRange] = useState('latsTen');

//   const getCompletedJourney = async () => {
//     console.log('@dateRange', dateRange.fromDate, dateRange.toDate);
//     // return;
//     try {
//       setIsLoading(true);
//       const url =
//         fetchDataByRange === 'latsTen'
//           ? '/api/user/getCompletedJourney/self/1/startingFromDate/lastTen/upToDate/lastTen'
//           : `/api/user/getCompletedJourney/self/1/startingFromDate/${convertToYMDHMSFormat(
//               dateRange.fromDate,
//             )}/upToDate/${convertToYMDHMSFormat(dateRange.toDate)}`;
//       const result = await requestUsingGetMethod({
//         params: '',
//         url,
//       });
//       setlistOfJourney(result?.data);
//       console.log('@result getCompletedJourney', result?.data);
//     } catch (error) {
//       setIsLoading(false);
//       console.log('@getCompletedJourney error', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     setlistOfJourney([]);
//     if (fetchDataByRange === 'latsTen') {
//       getCompletedJourney();
//     }
//   }, [fetchDataByRange, dateRange.fromDate, dateRange.toDate]);

//   const [journeyPoints, setJourneyPoints] = useState([]);
//   useEffect(() => {
//     const dataList = [];
//     listOfJourney?.map(journey => {
//       const destination = {
//         latitude: journey?.passenger?.originLatitude,
//         longitude: journey?.passenger?.originLongitude,
//         description: journey?.passenger?.destinationPlace,
//       };
//       const origin = {
//         latitude: journey?.passenger?.destinationLatitude,
//         longitude: journey?.passenger?.destinationLongitude,
//         description: journey?.passenger?.originPlace,
//         shippingDate: journey?.passenger?.shippingDate,
//       };
//       dataList?.push({ origin, destination });
//     });
//     setJourneyPoints(dataList);
//   }, [listOfJourney]);

//   const handleDatePickerVisibility = range => {
//     if (range === 'fromDate') {
//       setDateRange(prev => ({
//         ...prev,
//         showFromDate: true,
//         showToDate: false,
//       }));
//     } else {
//       setDateRange(prev => ({
//         ...prev,
//         showFromDate: false,
//         showToDate: true,
//       }));
//     }
//   };
//   const ColorStyles = getAppsColorStyles();
//   if (isLoading) return <ActivityIndicator />;

//   return (
//     <ScrollView>
//       <View style={{ padding: 15 }}>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginVertical: 10,
//           }}
//         >
//           <View
//             style={{
//               gap: 5,
//               flexDirection: 'row',
//               alignItems: 'center',
//               marginRight: 20,
//             }}
//           >
//             <View
//               style={{
//                 backgroundColor: ColorStyles.whiteColor, // your desired background color
//                 borderRadius: 4,
//                 padding: 0,
//                 alignSelf: 'flex-start', // optional: prevent stretching
//               }}
//             >
//               <Checkbox
//                 status={
//                   fetchDataByRange === 'latsTen' ? 'checked' : 'unchecked'
//                 }
//                 onPress={() => setfetchDataByRange('latsTen')}
//               />
//             </View>
//             <Text style={{ color: ColorStyles.textColor }}>
//               last ten record data
//             </Text>
//           </View>
//           <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
//             <View
//               style={{
//                 backgroundColor: ColorStyles.whiteColor, // your desired background color
//                 borderRadius: 4,
//                 padding: 0,
//                 alignSelf: 'flex-start', // optional: prevent stretching
//               }}
//             >
//               <Checkbox
//                 status={
//                   fetchDataByRange === 'dateRange' ? 'checked' : 'unchecked'
//                 }
//                 onPress={() => setfetchDataByRange('dateRange')}
//                 color={ColorStyles.brandColor} // optional: checkmark color
//               />
//             </View>
//             <Text style={{ color: ColorStyles.textColor }}>
//               by date range data
//             </Text>
//           </View>
//         </View>

//         {fetchDataByRange === 'dateRange' && (
//           <View style={{ gap: 20 }}>
//             {dateRange?.showFromDate && (
//               <DateTimePicker
//                 onChange={(_, date) => {
//                   if (date) {
//                     setDateRange(prev => ({
//                       ...prev,
//                       fromDate: date,
//                       showFromDate: false,
//                     }));
//                   } else {
//                     setDateRange(prev => ({
//                       ...prev,
//                       showFromDate: false,
//                     }));
//                   }
//                 }}
//                 value={dateRange.fromDate || new Date()}
//                 mode="date"
//               />
//             )}
//             {dateRange?.showToDate && (
//               <DateTimePicker
//                 onChange={(_, date) => {
//                   if (date) {
//                     setDateRange(prev => ({
//                       ...prev,
//                       toDate: date,
//                       showToDate: false,
//                     }));
//                   } else {
//                     setDateRange(prev => ({
//                       ...prev,
//                       showToDate: false,
//                     }));
//                   }
//                 }}
//                 value={dateRange.toDate || new Date()}
//                 mode="date"
//               />
//             )}

//             <TouchableOpacity
//               onPress={() => handleDatePickerVisibility('fromDate')}
//             >
//               <TextInput
//                 value={convertToYMDHMSFormat(dateRange.fromDate)}
//                 editable={false}
//                 label={'From Date'}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => handleDatePickerVisibility('toDate')}
//             >
//               <TextInput
//                 value={convertToYMDHMSFormat(dateRange.toDate)}
//                 editable={false}
//                 label={'To Date'}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={getCompletedJourney}
//               style={[GlobalStyles.button]}
//             >
//               <Text style={[GlobalStyles.buttonText]}>Select</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         <View>
//           <PickupAndDestinationDisplayer listOfJourneyPoints={journeyPoints} />
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default CompletedHistory;
import { ScrollView, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Checkbox,
  Text,
  TextInput,
} from 'react-native-paper';

import { requestUsingGetMethod } from '../../utils/handleRequestToServer/handleRequestToServer';
import { convertToYMDHMSFormat } from '../../utils/TimeDateHandler/TimeDateHandler';

import PickupAndDestinationDisplayer from '../PickUpAndDestination/PickupAndDestinationDisplayer';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
import getAppsGlobalStyles from '../../GlobalStyles/AppsGlobalStyles';
import createStyles from './CompletedHistory.style';

const CompletedHistory = () => {
  const GlobalStyles = getAppsGlobalStyles();
  const ColorStyles = getAppsColorStyles();
  const styles = createStyles(ColorStyles);

  const [listOfJourney, setlistOfJourney] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    fromDate: new Date(),
    toDate: new Date(),
    showFromDate: false,
    showToDate: false,
  });
  const [fetchDataByRange, setfetchDataByRange] = useState('latsTen');
  const [journeyPoints, setJourneyPoints] = useState([]);

  const getCompletedJourney = async () => {
    try {
      setIsLoading(true);
      const url =
        fetchDataByRange === 'latsTen'
          ? '/api/user/getCompletedJourney/self/1/startingFromDate/lastTen/upToDate/lastTen'
          : `/api/user/getCompletedJourney/self/1/startingFromDate/${convertToYMDHMSFormat(
              dateRange.fromDate,
            )}/upToDate/${convertToYMDHMSFormat(dateRange.toDate)}`;
      const result = await requestUsingGetMethod({ params: '', url });
      setlistOfJourney(result?.data);
    } catch (error) {
      console.log('@getCompletedJourney error', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setlistOfJourney([]);
    if (fetchDataByRange === 'latsTen') {
      getCompletedJourney();
    }
  }, [fetchDataByRange, dateRange.fromDate, dateRange.toDate]);

  useEffect(() => {
    const dataList = listOfJourney.map(journey => {
      const destination = {
        latitude: journey?.passenger?.originLatitude,
        longitude: journey?.passenger?.originLongitude,
        description: journey?.passenger?.destinationPlace,
      };
      const origin = {
        latitude: journey?.passenger?.destinationLatitude,
        longitude: journey?.passenger?.destinationLongitude,
        description: journey?.passenger?.originPlace,
        shippingDate: journey?.passenger?.shippingDate,
      };
      return { origin, destination };
    });
    setJourneyPoints(dataList);
  }, [listOfJourney]);

  const handleDatePickerVisibility = range => {
    setDateRange(prev => ({
      ...prev,
      showFromDate: range === 'fromDate',
      showToDate: range === 'toDate',
    }));
  };

  if (isLoading) return <ActivityIndicator />;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.checkboxRow}>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={
                  fetchDataByRange === 'latsTen' ? 'checked' : 'unchecked'
                }
                onPress={() => setfetchDataByRange('latsTen')}
              />
            </View>
            <Text style={styles.checkboxLabel}>last ten record data</Text>
          </View>

          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={
                  fetchDataByRange === 'dateRange' ? 'checked' : 'unchecked'
                }
                onPress={() => setfetchDataByRange('dateRange')}
                color={ColorStyles.brandColor}
              />
            </View>
            <Text style={styles.checkboxLabel}>by date range data</Text>
          </View>
        </View>

        {fetchDataByRange === 'dateRange' && (
          <View style={styles.dateRangeContainer}>
            {dateRange.showFromDate && (
              <DateTimePicker
                onChange={(_, date) =>
                  setDateRange(prev => ({
                    ...prev,
                    fromDate: date || prev.fromDate,
                    showFromDate: false,
                  }))
                }
                value={dateRange.fromDate}
                mode="date"
              />
            )}
            {dateRange.showToDate && (
              <DateTimePicker
                onChange={(_, date) =>
                  setDateRange(prev => ({
                    ...prev,
                    toDate: date || prev.toDate,
                    showToDate: false,
                  }))
                }
                value={dateRange.toDate}
                mode="date"
              />
            )}

            <TouchableOpacity
              onPress={() => handleDatePickerVisibility('fromDate')}
            >
              <TextInput
                value={convertToYMDHMSFormat(dateRange.fromDate)}
                editable={false}
                label="From Date"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDatePickerVisibility('toDate')}
            >
              <TextInput
                value={convertToYMDHMSFormat(dateRange.toDate)}
                editable={false}
                label="To Date"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={getCompletedJourney}
              style={GlobalStyles.button}
            >
              <Text style={GlobalStyles.buttonText}>Select</Text>
            </TouchableOpacity>
          </View>
        )}

        <PickupAndDestinationDisplayer listOfJourneyPoints={journeyPoints} />
      </View>
    </ScrollView>
  );
};

export default CompletedHistory;
