import { View, Text, SafeAreaView, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, useNavigation, useRouter } from 'expo-router';
import { SelecTravelesList } from '../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { useTrip } from '../../contexts/TripContext'; // Import the useTrip hook

export default function SelectTraveler() {
    const navigation = useNavigation();
    const [selectedTraveler, setSelectedTraveler] = useState();
    const { tripData, setTripData } = useTrip(); // Use the trip context

    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        }, []);

        // Update the tripData when a traveler is selected
        if (selectedTraveler) {
            setTripData({
                ...tripData,
                traveler: selectedTraveler,
            });
            console.log(tripData)
        }
    }, [selectedTraveler]);

    const onClick =() =>{
      if (tripData.traveler) {
        router.push('/create-trip/select-dates'); // Replace with your next screen route
      } else {
        ToastAndroid.show('Failed to save data. Please try again.', ToastAndroid.LONG);
      }
      console.log(tripData)
    };

    return (
        <SafeAreaView>
            <View style={{
                paddingHorizontal: 25,
                paddingTop: 55,
                height: '100%',
                gap: 20
            }}>
                <Text style={{
                    fontSize: 26,
                    fontFamily: 'nunito-exbold',
                    marginTop: 20
                }}>Choose your travelers</Text>
                <FlatList
                    data={SelecTravelesList}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => setSelectedTraveler(item)}
                            style={{
                                marginVertical: 10,
                            }}>
                            <OptionCard option={item} selectedOption={selectedTraveler} />
                        </TouchableOpacity>
                    )}
                />
                <TouchableOpacity 
                  onPress={onClick}
                  style={{
                      padding: 15,
                      backgroundColor:'#0365FA',
                      marginBottom: 40,
                      borderRadius: 15
                    }}>
                      <Text style={{
                        textAlign:'center',
                        fontFamily:'nunito-semibold',
                        fontSize: 17,
                        color:'white'
                      }}>Continue</Text>
                </TouchableOpacity>
            </View>

            
        </SafeAreaView>
    );
}
