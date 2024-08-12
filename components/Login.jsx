import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRouter } from 'expo-router';
import { Video } from 'expo-av';

export default function Login() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={require('./../assets/video.mp4')}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={styles.backgroundVideo}
      />
      <View style={styles.overlay} />

      {/* Logo Section */}
      <Image 
        source={require('./../assets/images/logo_.png')} 
        style={styles.logo}
        testID="logo" // Test ID for testing purposes
      />

      {/* App Name and Description */}
      <Text style={styles.appName}>iTravel</Text>
      <Text style={styles.description}>
        Discover you next adventure effortlessly. Personalized itineraries at your fingertips. {"\n"} 
        Travel smarter with AI-driven insights
      </Text>
      
      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        {/* Login Button */}
        <TouchableOpacity
          onPress={() => router.push('auth/sign-in')}
        >
          <LinearGradient
            colors={['#8AA3ED', '#385195']} // Dark to light blue gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }} // Horizontal gradient
            style={styles.loginButton}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Sign-Up Button */}
        {/* <TouchableOpacity style={styles.signUpButton} onPress={() => router.push('auth/sign-up')}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: Dimensions.get('window').width,
    height: 'auto'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  logo: {
    width: 180,
    height: 100,
  },
  appName: {
    fontSize: 35,
    color: '#ffffff',
    fontFamily: 'nunito-exbold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 50,
    fontFamily: 'nunito-exlight',
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center', // Center buttons horizontally
  },
  loginButton: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 35
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'nunito-semibold',
  },
  signUpButton: {
    borderRadius: 10,
    marginBottom: 15,
    paddingVertical: 15,
    width: '100%', // Full width button
  },
  signUpButtonText: {
    fontSize: 15,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'nunito-exlight',
  },
});
