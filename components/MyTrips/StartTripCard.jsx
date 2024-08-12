import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function StartTripCard() {
    const router = useRouter();
  return (
    <View style={{
        padding: 20,
        marginTop: 50,
        display: 'flex',
        alignItems: 'center',
        gap:25
    }}>
      <Ionicons name='location' size={35} color="#0365FA"/>
      <Text style={{
        fontSize: 25,
        fontFamily: 'nunito-semibold',
        marginTop: 10
      }}>No trips planned yet</Text>
      <Text style={{
        fontSize: 18,
        fontFamily: 'nunito-exlight',
        marginTop: 5
      }}>Looks like it's time to plan a new travel experience! Get started below</Text>
      
      <TouchableOpacity onPress={() => router.replace('/create-trip')} style={{
        padding:10,
        backgroundColor:'black',
        borderRadius:15,
        paddingHorizontal:30,
        

      }}>
        <Text style={{
            fontFamily:'nunito-semibold',
            color:"#F2F2F2"
        }}>Start a new trip</Text>
        </TouchableOpacity>
    </View>
  )
}