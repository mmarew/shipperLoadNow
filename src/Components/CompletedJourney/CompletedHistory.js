import { ScrollView, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { requestUsingGetMethode } from '../../utils/handleRequestToServer/handleRequestToServer';
import { useEffect, useState } from 'react';
import PickupAndDestinationDisplayer from '../PickUpAndDestination/PickupAndDestinationDisplayer';
import {
  ActivityIndicator,
  Checkbox,
  Text,
  TextInput,
} from 'react-native-paper';
import { convertToYMDHMSFormat } from '../../utils/TimeDateHandler/TimeDateHandler';
import GlobalStyles from '../../GlobalStyles/GlobalStyles';
import ColorStyles from '../../GlobalStyles/Color.styles';

const HistoryScreen = () => {
  const [listOfJourney, setlistOfJourney] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    fromDate: new Date(),
    toDate: new Date(),
    showFromDate: false,
    showToDate: false,
  });
  const [fetchDataByRange, setfetchDataByRange] = useState('latsTen');

  const getCompletedJourney = async () => {
    console.log('@dateRange', dateRange.fromDate, dateRange.toDate);
    // return;
    try {
      setIsLoading(true);
      const url =
        fetchDataByRange === 'latsTen'
          ? '/api/user/getCompletedJourney/self/1/startingFromDate/lastTen/upToDate/lastTen'
          : `/api/user/getCompletedJourney/self/1/startingFromDate/${convertToYMDHMSFormat(
              dateRange.fromDate,
            )}/upToDate/${convertToYMDHMSFormat(dateRange.toDate)}`;
      const result = await requestUsingGetMethode({
        params: '',
        url,
      });
      setlistOfJourney(result?.data);
      console.log('@result getCompletedJourney', result?.data);
    } catch (error) {
      setIsLoading(false);
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

  const [journeyPoints, setJourneyPoints] = useState([]);
  useEffect(() => {
    const dataList = [];
    listOfJourney?.map(journey => {
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
      dataList?.push({ origin, destination });
    });
    setJourneyPoints(dataList);
  }, [listOfJourney]);

  const handleDatePickerVisibility = range => {
    if (range === 'fromDate') {
      setDateRange(prev => ({
        ...prev,
        showFromDate: true,
        showToDate: false,
      }));
    } else {
      setDateRange(prev => ({
        ...prev,
        showFromDate: false,
        showToDate: true,
      }));
    }
  };
  if (isLoading) return <ActivityIndicator />;

  return (
    <ScrollView>
      <View style={{ padding: 15 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 20,
            }}
          >
            <Checkbox
              status={fetchDataByRange === 'latsTen' ? 'checked' : 'unchecked'}
              onPress={() => setfetchDataByRange('latsTen')}
            />
            <Text style={{ color: ColorStyles.textColor }}>
              last ten record data
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={
                fetchDataByRange === 'dateRange' ? 'checked' : 'unchecked'
              }
              onPress={() => setfetchDataByRange('dateRange')}
            />
            <Text style={{ color: ColorStyles.textColor }}>
              by date range data
            </Text>
          </View>
        </View>

        {fetchDataByRange === 'dateRange' && (
          <View style={{ gap: 20 }}>
            {dateRange?.showFromDate && (
              <DateTimePicker
                onChange={(_, date) => {
                  if (date) {
                    setDateRange(prev => ({
                      ...prev,
                      fromDate: date,
                      showFromDate: false,
                    }));
                  } else {
                    setDateRange(prev => ({
                      ...prev,
                      showFromDate: false,
                    }));
                  }
                }}
                value={dateRange.fromDate || new Date()}
                mode="date"
              />
            )}
            {dateRange?.showToDate && (
              <DateTimePicker
                onChange={(_, date) => {
                  if (date) {
                    setDateRange(prev => ({
                      ...prev,
                      toDate: date,
                      showToDate: false,
                    }));
                  } else {
                    setDateRange(prev => ({
                      ...prev,
                      showToDate: false,
                    }));
                  }
                }}
                value={dateRange.toDate || new Date()}
                mode="date"
              />
            )}

            <TouchableOpacity
              onPress={() => handleDatePickerVisibility('fromDate')}
            >
              <TextInput
                value={convertToYMDHMSFormat(dateRange.fromDate)}
                editable={false}
                label={'From Date'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDatePickerVisibility('toDate')}
            >
              <TextInput
                value={convertToYMDHMSFormat(dateRange.toDate)}
                editable={false}
                label={'To Date'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={getCompletedJourney}
              style={[GlobalStyles.button]}
            >
              <Text style={[GlobalStyles.buttonText]}>Select</Text>
            </TouchableOpacity>
          </View>
        )}

        <View>
          <PickupAndDestinationDisplayer listOfJourneyPoints={journeyPoints} />
        </View>
      </View>
    </ScrollView>
  );
};

export default HistoryScreen;
