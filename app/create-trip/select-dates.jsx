import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, router } from 'expo-router'; // Import router for navigation
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { useTrip } from '../../contexts/TripContext'; // Import the useTrip hook

export default function SelectDates() {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { tripData, setTripData } = useTrip(); // Use the trip context

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, [navigation]);

  const onDateChange = (date, type) => {
    if (type === 'START_DATE') {
      setStartDate(moment(date));
    } else {
      setEndDate(moment(date));
    }
  };

  const onDateSelection = () => {
    if (!startDate || !endDate) {
      ToastAndroid.show('Please select Start and End Date', ToastAndroid.LONG);
      return;
    }

    const totalNoOfDays = endDate.diff(startDate, 'days') + 1; // Including the start date
    setTripData({
      ...tripData,
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
      totalNoOfDays,
    });

    // Confirm the data has been added to tripData
    if (tripData.startDate && tripData.endDate && tripData.totalNoOfDays) {
      router.push('/create-trip/select-budget'); // Replace with your next screen route
    } else {
      ToastAndroid.show('Failed to save dates. Please try again.', ToastAndroid.LONG);
    }
  };

  return (
    <View style={{
      paddingHorizontal: 25,
      paddingTop: 55,
      height: '100%',
      gap: 50
    }}>
      <Text style={{
        fontFamily: 'nunito-exbold',
        fontSize: 26,
        marginTop: 20
      }}>Select Dates</Text>

      <View>
        <CalendarPicker
          allowRangeSelection={true}
          selectedDayColor="#0365FA"
          selectedDayTextColor="#FFFFFF"
          todayBackgroundColor="#000000"
          minDate={new Date()}
          textStyle={{
            fontFamily: "nunito-semibold",
            fontSize: 12
          }}
          onDateChange={onDateChange}
        />
      </View>

      <TouchableOpacity
        onPress={onDateSelection}
        style={{
          padding: 15,
          backgroundColor: '#0365FA',
          borderRadius: 15
        }}>
        <Text style={{
          fontFamily: 'nunito-semibold',
          color: 'white',
          textAlign: 'center'
        }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
