import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { useTrip } from '../../contexts/TripContext'; // Import the useTrip hook
import { Ionicons } from '@expo/vector-icons';

export default function ReviewTrip() {
    const navigation = useNavigation();
    const { tripData } = useTrip(); // Use the trip context

    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        });
    }, [navigation]);

    const onClick = () => {
        router.replace('/create-trip/generate-trip')
    }

    return (
        <View style={{
            paddingHorizontal: 25,
            paddingTop: 60,
            height: '100%',
            gap: 40
        }}>
            <View>
                <Text style={{
                    fontFamily: 'nunito-exbold',
                    fontSize: 26,
                    marginTop: 20
                }}>Review your Trip</Text>
                <Text style={{
                    fontFamily: 'nunito-exlight',
                    fontSize: 16,
                    marginTop: 10
                }}>Please review your trip data before generating</Text>
            </View>

            {/* Display Trip Data */}
            <View style={{
                gap: 30
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 30
                }}>
                    <Text style={{  fontSize: 24 }}>📌</Text>
                    <View>
                        <Text style={{ fontFamily: 'nunito-exlight', fontSize: 16 }}>Destination:</Text>
                        <Text style={{ fontFamily: 'nunito-exbold', fontSize: 14 }}>{tripData?.place || 'Not selected'}</Text>
                    </View>

                </View>

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 30
                }}>
                    <Text style={{  fontSize: 24 }}>🗓️</Text>
                    <View>
                        <Text style={{ fontFamily: 'nunito-exlight', fontSize: 16 }}>Travel Dates:</Text>
                        <Text style={{ fontFamily: 'nunito-exbold', fontSize: 14 }}>
                        {tripData?.startDate ? `${tripData.startDate} to ${tripData.endDate}` : 'Not selected'}
                    </Text>
            </View>

                </View>

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 30
                }}>
                    <Text style={{  fontSize: 24 }}>⏳</Text>
                    <View>
                        <Text style={{ fontFamily: 'nunito-exlight', fontSize: 16 }}>
                            Duration:
                        </Text>
                        <Text style={{ fontFamily: 'nunito-exbold', fontSize: 14 }}>
                            {tripData?.totalNoOfDays ? `${tripData.totalNoOfDays} days` : 'Total Days: Not calculated'}
                        </Text>
                    </View>

                </View>

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 30
                }}>
                    
                    <Text style={{  fontSize: 24 }}>🧳</Text>
                    <View>
                        <Text style={{ fontFamily: 'nunito-exlight', fontSize: 16 }}>Who is travelling ?</Text>
                        <Text style={{ fontFamily: 'nunito-exbold', fontSize: 14 }}>{tripData?.traveler?.title || 'No travelers selected'}</Text>
                    </View>

                </View>

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 30
                }}>
                    
                    <Text style={{  fontSize: 24 }}>💰</Text>
                    <View>
                        <Text style={{ fontFamily: 'nunito-exlight', fontSize: 16 }}>Budget:</Text>
                        <Text style={{ fontFamily: 'nunito-exbold', fontSize: 14 }}>{tripData?.budget?.title || 'No budget selected'}</Text>
                    </View>

                </View>
            </View>

            <TouchableOpacity 
                onPress={onClick}
                style={{
                    padding: 15,
                    backgroundColor:'#0365FA',
                    borderRadius:15,
                    marginTop: 20
            }}>
                <Text style={{
                    textAlign: 'center',
                    fontFamily: 'nunito-semibold',
                    fontSize: 14,
                    color: 'white'
                }}>Build My Trip</Text>
            </TouchableOpacity>
        </View>
    );
}
