import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#0365FA',
      tabBarStyle: {
        backgroundColor: '#f0f4f7',
        height: 60,
         // Adjust tab bar height if needed
      },
    }}>
        <Tabs.Screen 
          name="home" 
          options={{
            tabBarLabel: 'Home',
            tabBarIcon:({color}) => <Ionicons name="home-outline" size={22} color={color} />
          }}
        />
        <Tabs.Screen 
          name="mytrip" 
          options={{
            tabBarLabel: 'My Trips',
            tabBarIcon:({color}) => <Ionicons name="location" size={24} color={color} />
          }}
        />
        <Tabs.Screen 
          name="create-trip" 
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
              <View style={{
                width: 70, 
                height: 70, 
                borderRadius: 35, 
                backgroundColor: '#0365FA', 
                justifyContent: 'center', 
                alignItems: 'center',
                marginBottom: 40, // This raises the tab item higher
              }}>
                <MaterialIcons name="add" size={40} color="white" />
              </View>
            ),
          }}
        />
        <Tabs.Screen 
          name="discover"
          options={{
            tabBarLabel: 'Discover',
            tabBarIcon:({color}) => <Ionicons name='globe-outline' size={24} color={color}/>,
          }}
        />
        <Tabs.Screen 
          name="profile" 
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon:({color}) => <Ionicons name='person-outline' size={24} color={color}/>,
          }}
        />
    </Tabs>
  )
}
