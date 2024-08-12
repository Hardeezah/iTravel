import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, router } from 'expo-router';
import { SelectBudjetOptions } from '../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { useTrip } from '../../contexts/TripContext'; // Import the useTrip hook

export default function SelectBudget() {
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState();
    const { tripData, setTripData } = useTrip(); // Use the trip context

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        });
    }, [navigation]);

    const onClickContinue = () => {
        if (!selectedOption) {
            ToastAndroid.show('Select your budget', ToastAndroid.LONG);
            return;
        }

        setTripData({
            ...tripData,
            budget: selectedOption,
        });
        
        console.log(tripData);

        // Confirm the data has been added to tripData and navigate to the next screen
        if (tripData.budget) {
            router.push('/create-trip/review-trip'); // Replace with your next screen route
        } else {
            ToastAndroid.show('Failed to save budget. Please try again.', ToastAndroid.LONG);
        }
    };

    return (
        <View style={{
            paddingHorizontal: 25,
            paddingTop: 60,
            height: '100%',
            gap: 50
        }}>
            <View>
                <Text style={{
                    fontFamily: 'nunito-exbold',
                    fontSize: 26,
                    marginTop: 20
                }}>Select Budget</Text>
                <Text style={{
                    fontFamily: 'nunito-exlight',
                    fontSize: 18,
                    marginTop: 10
                }}>What is your budget for the trip?</Text>
            </View>
            <FlatList
                data={SelectBudjetOptions}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress={() => setSelectedOption(item)}
                        style={{
                            marginVertical: 10
                        }}>
                        <OptionCard option={item} selectedOption={selectedOption}/>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity 
                onPress={onClickContinue}
                style={{
                    padding: 15,
                    backgroundColor: '#0365FA',
                    marginBottom: 40,
                    borderRadius: 15
                }}>
                <Text style={{
                    textAlign: 'center',
                    fontFamily: 'nunito-semibold',
                    fontSize: 17,
                    color: 'white'
                }}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}
