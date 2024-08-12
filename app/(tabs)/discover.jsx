import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, Image, ScrollView } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SCREEN_WIDTH / 4; // Adjust this to show 4 items on screen
const ITEM_WIDTH_BIG = SCREEN_WIDTH /1.5

import travelSpotsData from './../../constants/data.json';

export default function Discover() {
/*   const [categories] = useState([
    { id: '1', title: 'Islands', icon: <MaterialCommunityIcons name="island" size={32} color="#344B85" /> },
    { id: '2', title: 'Camping', icon: <MaterialIcons name="nature-people" size={32} color="#344B85" /> },
    { id: '3', title: 'Hiking', icon: <FontAwesome5 name="hiking" size={32} color="#344B85" /> },
    { id: '4', title: 'Skiing', icon: <FontAwesome5 name="skiing" size={32} color="#344B85" /> },
    { id: '5', title: 'City Tours', icon: <MaterialCommunityIcons name="city-variant-outline" size={32} color="#344B85" />},
    { id: '7', title: 'Cruises', icon: <MaterialIcons name="directions-boat" size={32} color="#344B85" /> },
  ]);
 */
  const vacationSpots = travelSpotsData.travel_spots.filter(spot => spot.category === 'Vacation');
  const coupleSpots = travelSpotsData.travel_spots.filter(spot => spot.category === 'Couples');
  const randomSpots = travelSpotsData.travel_spots.filter(spot => spot.category === 'Random');

  const renderSpotItem = ({ item }) => (
    <View style={styles.spotItem}>
      <Image source={{ uri: item.image_url }} style={styles.spotImage} />
      <Text style={{
        fontFamily: 'nunito-semibold',
        marginTop: 10
      }}>{item.place_name}</Text>
    </View>
  );

/*   const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryItem}>
      {item.icon}
      <Text style={styles.categoryText}>{item.title}</Text>
    </View>
  );
 */
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Discover</Text>
      {/* <View>
        <Text style={styles.small}>Discover by activity</Text>
        <Carousel
          loop={false}
          width={SCREEN_WIDTH}
          height={100 } // Adjust height to fit your content
          data={categories}
          renderItem={renderCategoryItem}
          customConfig={() => ({ currentIndex: -1 })}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10], // Sensitivity for horizontal scrolling
          }}
          scrollAnimationDuration={500}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          // Adjust the carousel to show multiple items at once
          mode="horizontal-stack"
          modeConfig={{
            snapDirection: 'left',
            stackInterval: ITEM_WIDTH + 5, // Adjust space between items
          }}
        />
      </View> */}
      <Text style={{
        
        fontFamily: 'nunito-exlight',
        marginBottom: 10,
        }}>Popular Vacation Spots</Text>
      <Carousel
        width={SCREEN_WIDTH}
        height={300} 
        data={vacationSpots}
        renderItem={renderSpotItem}
        loop={false}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10], // Sensitivity for horizontal scrolling
        }}
        scrollAnimationDuration={500}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        mode="horizontal-stack"
        modeConfig={{
          snapDirection: 'left',
          stackInterval: ITEM_WIDTH_BIG , // Adjust space between items
        }}
      />

<Text style={{
        fontFamily: 'nunito-exlight',
        marginBottom: 10,
        
        }}>Popular Romantic Spots</Text>
      <Carousel
        width={SCREEN_WIDTH}
        height={300} 
        data={coupleSpots}
        renderItem={renderSpotItem}
        loop={false}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10], // Sensitivity for horizontal scrolling
        }}
        scrollAnimationDuration={500}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        mode="horizontal-stack"
        modeConfig={{
          snapDirection: 'left',
          stackInterval: ITEM_WIDTH_BIG , // Adjust space between items
        }}
      />

<Text style={{
        fontFamily: 'nunito-exlight',
        marginBottom: 10,
        }}>Discover new places</Text>
      <Carousel
        width={SCREEN_WIDTH}
        height={300} 
        data={randomSpots}
        renderItem={renderSpotItem}
        loop={false}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10], // Sensitivity for horizontal scrolling
        }}
        scrollAnimationDuration={500}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        mode="horizontal-stack"
        modeConfig={{
          snapDirection: 'left',
          stackInterval: ITEM_WIDTH_BIG , // Adjust space between items
        }}
      />


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  spotImage: {
    
      width: '60%',
      height: 230,
      borderRadius: 15,
    
  },
  container: {
    padding: 20,
    marginTop: 20,
    backgroundColor: '#f0f4f7',
  },
  header: {
    fontFamily: 'nunito-exbold',
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16,
  },
  small:{
    fontFamily: 'nunito-exlight',
    marginBottom: 10,

  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginHorizontal: 5,
  },
  categoryText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});
