import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTrip } from '../../contexts/TripContext';


export default function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
/*   const [tripData, setTripData] = useState({ place: '', coordinates: null });
 */  const router = useRouter();
  const { tripData, setTripData } = useTrip();

  // Fetch suggestions from Nominatim API
  const fetchSuggestions = async (text) => {
    setQuery(text);
    if (text.length > 2) {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${text}`);
      const data = await response.json();
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  };

  // Handle selecting a suggestion
  const selectLocation = (location) => {
    const locationData = {
      latitude: parseFloat(location.lat),
      longitude: parseFloat(location.lon),
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };

    setSelectedLocation(locationData);
    console.log(location)
    setTripData({
      place: location.display_name,
      coordinates: locationData,
    });
    console.log(tripData)
    setQuery(location.display_name);
    setSuggestions([]);
    /* router.push('/create-trip/select-traveler') */
  };

  const onClick= () =>{
    if (tripData.place != "") {
      router.push('/create-trip/select-traveler'); // Replace with your next screen route
    } else {
      ToastAndroid.show('Failed to save data. Please try again.', ToastAndroid.LONG);
    }
  }

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={{
          paddingHorizontal: 20,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <View style={{
          paddingHorizontal: 20,
          display: 'flex',
          flexDirection: 'row',
          gap: 20,
        }}>
          <TouchableOpacity onPress={()=> router.replace('/mytrip')} style={{
          }}>
          <Feather name="arrow-left" size={25} color="black" />
          </TouchableOpacity>
          
          <Text style={{
            fontFamily:'nunito-exbold',
            fontSize:20,
            
          }}>Search</Text>
        </View>
          
           <TouchableOpacity onPress={onClick} >
            <Feather name="arrow-right" size={25} color="black" />
           </TouchableOpacity>
            
        </View>

      <TextInput
        style={styles.searchBox}
        placeholder="Search for a place"
        value={query}
        onChangeText={fetchSuggestions}
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <FlatList
          style={styles.suggestions}
          data={suggestions}
          keyExtractor={(item) => item.place_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => selectLocation(item)}>
              <Text style={styles.itemText}>{item.display_name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Map View */}
      <MapView
        style={styles.map}
        region={selectedLocation}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  searchBox: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    zIndex: 1,
  },
  suggestions: {
    maxHeight: 150,
    marginHorizontal: 10,
    backgroundColor: 'white',
    zIndex: 2,
  },
  itemText: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  map: {
    flex: 1, // Makes the map span the remaining height
    margin: 10,
    zIndex: 0,
  },
});




/* import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default function CreateTrip() {
  const router = useRouter()

  return (
    <SafeAreaView>
      <View style={{
        height:'100%'
      }}>
        <View style={{
          padding: 25,
          display: 'flex',
          flexDirection: 'row',
          gap: 20,
          marginTop: 25
        }}>
          <TouchableOpacity onPress={()=> router.replace('/mytrip')} style={{
            
          }}>
          <Feather name="arrow-left" size={25} color="black" />

          </TouchableOpacity>
          <Text style={{
            fontFamily:'nunito-exbold',
            fontSize:20,
            
          }}>Search</Text>
        </View>

      <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'YOUR API KEY',
        language: 'en',
      }}
    />
    </View>
    </SafeAreaView>
  )
} */