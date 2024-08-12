import { View, Text, Image, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import MapView, { Marker } from 'react-native-maps';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';

export default function TripDetails() {
  const { tripData } = useLocalSearchParams();
  const [tripDetail, setTripDetail] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, [navigation]);

  useEffect(() => {
    if (tripData && !tripDetail) {
      const parsedTripData = JSON.parse(tripData);
      const details = {
        ...parsedTripData,
        tripData: JSON.parse(parsedTripData.tripData),
      };
      setTripDetail(details);
    }
  }, [tripData, tripDetail]);

  if (!tripDetail) {
    return (
      <View style={styles.errorContainer}>
        <Image
          source={require('./../../assets/images/loader.gif')}
          style={{ alignSelf: 'center' }}
        />
      </View>
    );
  }

  const SCREEN_WIDTH = Dimensions.get('window').width;
  const ITEM_WIDTH = SCREEN_WIDTH / 1.2;

  const toggleExpandCard = (day) => {
    setExpandedCards((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const renderActivity = (activity, idx) => (
    <View key={idx} style={styles.activityContainer}>
      {activity.activity && (
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 5
        }}>
          <Entypo name="location-pin" size={24} color="#36D6CA" />
            <Text style={styles.activityText}>{activity.activity}</Text>

        </View>
      )}
      {activity.time && (
        <Text style={styles.detailText}>Time: {activity.time}</Text>
      )}
      {activity.placeDetails && (
        <Text style={styles.detailText}>Details: {activity.placeDetails}</Text>
      )}
      {activity.ticketPricing && (
        <Text style={styles.detailText}>Ticket Pricing: {activity.ticketPricing}</Text>
      )}
      {activity.restaurantAddress && (
        <Text style={styles.detailText}>Restaurant Address: {activity.restaurantAddress}</Text>
      )}
      {activity.timeToTravel && (
        <Text style={styles.detailText}>Time to Travel: {activity.timeToTravel}</Text>
      )}
      {activity.geoCoordinates && (
        <Text style={styles.detailText}>Location Coordinates: {activity.geoCoordinates}</Text>
      )}
    </View>
  );

  const renderContent = () => {
    return [
      {
        key: 'map',
        content: (
          <View style={{ borderRadius: 15 }}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: tripDetail.tripData.coordinates.latitude,
                longitude: tripDetail.tripData.coordinates.longitude,
                latitudeDelta: tripDetail.tripData.coordinates.latitudeDelta,
                longitudeDelta: tripDetail.tripData.coordinates.longitudeDelta,
              }}
            >
              <Marker
                coordinate={{
                  latitude: tripDetail.tripData.coordinates.latitude,
                  longitude: tripDetail.tripData.coordinates.longitude,
                }}
                title={tripDetail.tripData.place}
              />
            </MapView>
          </View>
        ),
      },
      {
        key: 'tripDetails',
        content: (
          <View style={styles.container}>
            <Text style={styles.header}>{tripDetail.tripData.place}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.subHeader}>{tripDetail.tripData.startDate} to {tripDetail.tripData.endDate}</Text>
              <Text style={styles.subHeaderBold}>{tripDetail.tripData.traveler.title}</Text>
            </View>
          </View>
        ),
      },
      {
        key: 'flightDetails',
        content: (
          <View style={styles.container}>
            <Text style={styles.sectionHeader}>Flight Details</Text>
            {tripDetail.tripList.flight_details.flight_options.map((flight, index) => (
              <View key={index} style={[styles.detailContainer, styles.shadow]}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ display: 'flex', flexDirection: 'row', gap: 7, alignSelf: 'center' }}>
                    <Ionicons name="calendar" size={14} color="#92D4D7" />
                    <Text style={{ fontFamily: 'nunito-exlight', fontSize: 10 }}>{flight.departure_date}</Text>
                  </View>
                  <Text style={{ fontFamily: 'nunito-semibold', fontSize: 10 }}>{flight.flight_number}</Text>
                </View>
                <Text style={{ fontFamily: 'nunito-semibold', fontSize: 15, marginVertical: 6 }}>Airline: {flight.airline}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                  <Text style={{ fontFamily: 'nunito-exbold', fontSize: 14, color: 'gray' }}>{flight.departure_city}</Text>
                  <Ionicons name="airplane" size={24} color="#92D4D7" />
                  <Text style={{ fontFamily: 'nunito-exbold', fontSize: 14, color: 'gray' }}>{flight.arrival_city}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontFamily: 'nunito-semibold', fontSize: 11 }}>
                    Price: <Text style={{ fontFamily: 'nunito-exbold', fontSize: 11 }}> {flight.price}</Text>
                  </Text>
                  <TouchableOpacity
                    onPress={() => router.replace(`${flight.booking_url}`)}
                    style={{ paddingVertical: 5, paddingHorizontal: 8, backgroundColor: '#0365FA', borderRadius: 7 }}
                  >
                    <Text style={{ textAlign: 'center', fontFamily: 'nunito-semibold', fontSize: 10, color: 'white' }}>Book</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ),
      },
      {
        key: 'hotelDetails',
        content: (
          <View style={styles.container}>
            <Text style={styles.sectionHeader}>Hotel Details</Text>
            <View style={{ flexDirection: 'row', gap: 30, marginVertical: 10 }}>
              <Text style={{ fontFamily: 'nunito-semibold', color: 'gray', fontSize: 13 }}>
                Swipe right to see more
              </Text>
              <AntDesign name="arrowright" size={16} color="gray" />
            </View>
            <Carousel
              width={SCREEN_WIDTH - 40}  
              height={430}
              data={tripDetail.tripList.hotel_options}
              renderItem={({ item }) => (
                <View style={styles.hotelContainer}>
                  <Image source={{ uri: item.hotel_image_url }} style={styles.image} />
                  <View style={{ padding: 15 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                      <Text style={{ fontFamily: 'nunito-semibold', fontSize: 17 }}>{item.hotel_name}</Text>
                      <Text style={{ fontFamily: 'nunito-semibold', fontSize: 12 }}>⭐ {item.rating}</Text>
                    </View>
                    <Text style={{ fontFamily: 'nunito-exlight', fontSize: 14, marginTop: 10 }}>{item.description}</Text>
                    <View>
                      <Text style={{ fontFamily: 'nunito-semibold', fontSize: 12, marginTop: 10 }}>Address: {item.hotel_address}</Text>
                      <Text style={{ fontFamily: 'nunito-exbold', fontSize: 12, marginTop: 10 }}>🏷️ {item.price}</Text>
                    </View>
                  </View>
                </View>
              )}
              loop={false}
              mode="parallex"
              style={styles.carousel}
              modeConfig={{ snapDirection: 'left', stackInterval: ITEM_WIDTH }}
              customConfig={() => ({ currentIndex: -1 })}
              panGestureHandlerProps={{
                activeOffsetX: [-10, 10], // Sensitivity for horizontal scrolling
              }}
              scrollAnimationDuration={500}
            />
          </View>
        ),
      },
      {
        key: 'itinerary',
        content: (
          <View style={styles.container}>
            <Text style={styles.sectionHeader}>Itineraries</Text>
            {Object.keys(tripDetail.tripList.itinerary).map((day, index) => (
              <View key={index} style={styles.itineraryCard}>
                <TouchableOpacity
                  onPress={() => toggleExpandCard(day)}
                  style={styles.cardHeader}
                >
                  <Text style={styles.cardHeaderText}>Day {index + 1}: {tripDetail.tripList.itinerary[day].description}</Text>
                  <Entypo
                    name={expandedCards[day] ? 'chevron-up' : 'chevron-down'}
                    size={22}
                    color="#A8D1DF"
                  />
                </TouchableOpacity>
                {expandedCards[day] && (
                  <View style={styles.cardContent}>
                    {tripDetail.tripList.itinerary[day].schedule.map(renderActivity)}
                  </View>
                )}
              </View>
            ))}
          </View>
        ),
      },
    ];
  };

  return (
    <FlatList
      data={renderContent()}
      renderItem={({ item }) => item.content}
      keyExtractor={(item) => item.key}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: 300,
  },
  container: {
    padding: 20,
    backgroundColor: '#f0f4f7',
    gap: 10,
  },
  header: {
    fontSize: 18,
    fontFamily: 'nunito-exbold',
    marginVertical: 5,
  },
  subHeader: {
    fontSize: 10,
    color: '#555',
    marginBottom: 10,
    fontFamily: 'nunito',
  },
  image: {
    width: '100%',
    height: 210,
    borderRadius: 15,
  },
  subHeaderBold: {
    fontSize: 10,
    color: '#555',
    marginBottom: 10,
    fontFamily: 'nunito-exbold',
  },
  sectionHeader: {
    fontSize: 16,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
    fontFamily: 'nunito-semibold',
  },
  detailContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 9,
    fontFamily: 'nunito',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  hotelContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 10,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  carousel: {
    marginBottom: 20,
  },
  itineraryCard: {
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f0f4f7',
  },
  cardHeaderText: {
    fontSize: 16,
    fontFamily: 'nunito-semibold',
  },
  cardContent: {
    padding: 15,
  },
  activityContainer: {
    marginBottom: 40,
  },
  activityText: {
    fontSize: 14,
    fontFamily: 'nunito-exbold',
    width: '95%',
    marginBottom: 30
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
