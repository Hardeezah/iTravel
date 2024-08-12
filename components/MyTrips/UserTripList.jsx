import { View, Text, Image, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function UserTripList({ userTrips }) {
  const router = useRouter();

  const renderTripItem = ({ item }) => {
    const Trip = JSON.parse(item.tripData);
    console.log(Trip)

    return (
      <View style={{ marginTop: 20, 
        borderRadius: 15, marginBottom: 10 }}>
        <Image source={require('./../../assets/images/placeholder.jpeg')} style={styles.image} />
        <View style={{ marginTop: 4, }}>
          <Text style={styles.destinationText}>{item.tripList?.trip_details?.destination}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.dateText}>{Trip.startDate}</Text>
            <TouchableOpacity 
              style={styles.planButton}
              onPress={() => router.push({
                pathname: '/display-detail',
                params: { tripData: JSON.stringify(item) }
              })}>              
                <Text style={styles.planButtonText}>See plan</Text>
                <MaterialIcons name="navigate-next" size={20} color="white" style={{
                  alignSelf: 'center'
                }}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={userTrips}
      renderItem={renderTripItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}

const styles = {
  image: {
    width: '100%',
    height: 180,
    borderRadius: 15,
  },
  destinationText: {
    fontFamily: 'nunito-semibold',
    fontSize: 15,
    color: 'black',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  dateText: {
    fontFamily: 'nunito-exlight',
    fontSize: 12,
    color: 'black',
    alignSelf:'center'
  },
  planButton: {
    padding: 5,
    backgroundColor: '#0365FA',
    borderRadius: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planButtonText: {
    color: 'white',
    fontFamily: 'nunito-semibold',
    fontSize: 12,
    alignSelf:'center'
  },
};
 