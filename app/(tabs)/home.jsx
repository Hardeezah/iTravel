import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import topVisitedSpotsData from './../../constants/popular.json'; // Import the JSON file
import { useRouter } from 'expo-router';

const emojis = ['🧳', '🌍', '✈️', '🏝️', '🚂', '🗺️']; // Array of emojis to cycle through
const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH_BIG = SCREEN_WIDTH /3

export default function Home() {
  const [currentEmoji, setCurrentEmoji] = useState(emojis[0]);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmoji(prevEmoji => {
        const currentIndex = emojis.indexOf(prevEmoji);
        const nextIndex = (currentIndex + 1) % emojis.length;
        return emojis[nextIndex];
      });
    }, 3000); // 3000 ms = 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const renderSpotItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item.image_url }} style={styles.carouselImage} />
      <View style={{
        padding: 10
      }}>
        <Text style={styles.carouselText}>{item.place_name} </Text>
        <Text style={styles.carouselDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.greetingContainer}>
        <View>
          <Text style={styles.greetingText}>Hi there 👋</Text>
          <Text style={styles.subGreetingText}>What's your next destination?</Text>
        </View>
        <TouchableOpacity onPress={() => router.replace('/mytrip')}>
        <Text style={styles.emoji}>{currentEmoji}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.noTripCard}>
        <AntDesign name="calendar" size={24} color="gray" />
        <Text style={styles.noTripText}>No Ongoing Trip</Text>

      </View>

      {/* Top Visited Spots Carousel */}
      <Text style={styles.sectionTitle}>Top Visited Spots</Text>
      <View style={{
        flexDirection:'row',
        gap: 30,
        marginVertical: 10,

      }}>
      <Text style={{
         fontFamily: 'nunito-semibold',
         color: 'gray',
         fontSize: 13,


      }}>Swipe right to see more</Text>
      <AntDesign name="arrowright" size={16} color="gray" />    
       </View>
      <Carousel
        width={SCREEN_WIDTH}
        height={500}
        data={topVisitedSpotsData.top_visited_spots}
        renderItem={renderSpotItem}
        scrollAnimationDuration={1000}
        
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        mode="horizontal-stack"
        modeConfig={{
          snapDirection: 'left',
          stackInterval: ITEM_WIDTH_BIG + ITEM_WIDTH_BIG + ITEM_WIDTH_BIG , // Adjust space between items
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    gap: 50,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  greetingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  greetingText: {
    fontFamily: 'nunito-exbold',
    fontSize: 24,
  },
  subGreetingText: {
    fontFamily: 'nunito-exlight',
    fontSize: 16,
    paddingTop: 5,
  },
  emoji: {
    fontSize: 27,
    alignSelf: 'center',
  },
  noTripCard: {
    backgroundColor: 'white',
    height: 180,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: 25
  },
  noTripText: {
    fontFamily: 'nunito-exbold',
    fontSize: 18,
    color: 'gray',
  },
  sectionTitle: {
    fontFamily: 'nunito-semibold',
    fontSize: 18,
    marginVertical: 20,
  },
  carouselItem: {
    marginBottom: 50,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10
  },
  carouselImage: {
     width: '100%',
      height: 300,
      borderRadius: 15,
  },
  carouselText: {
    fontSize: 18,
    fontFamily: 'nunito-semibold',
    marginTop: 10,
  },
  carouselDescription: {
    fontSize: 14,
    fontFamily: 'nunito-exlight',
    color: 'gray',
    marginTop: 5,
  },
});
