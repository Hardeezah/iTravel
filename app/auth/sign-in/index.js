import React, {useEffect, useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, ToastAndroid } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from './../../../config/FirebaseConfig'


export default function SignIn() {
    const navigation = useNavigation();
    const router = useRouter();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    useEffect (() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const OnSignIn = () =>{
        if(!email && !password){
            ToastAndroid.show('Please enter all details', ToastAndroid.TOP)
        
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                router.replace('/home')
                // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);

            if(errorCode=='auth/invalid-credential'){
                ToastAndroid.show("Invalid cresentioals", Toast.LONG)
            }
        });
    }
  return (
    
    <View style={styles.container}>
    {/* Top Image */}
    <Image
      source={require('./../../../assets/images/signin-.png')}
      style={styles.topImage}
    />
    
    {/* Welcome Text */}
    <Text style={styles.welcomeText}>Hello, {"\n"}Welcome Back!</Text>

    {/* Email Form */}
    <View style={styles.inputContainer}>
      <MaterialIcons name="email" size={18} color="black" style={styles.icon} />
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={(value) => setEmail(value)}
      />
    </View>

    {/* Password Form */}
    <View style={styles.inputContainer}>
      <MaterialIcons name="lock" size={18} color="black" style={styles.icon} />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(value) => setPassword(value)}
      />
    </View>

    {/* Sign-In Button */}
    <TouchableOpacity style={styles.signInButtonContainer} onPress={OnSignIn}>
      <LinearGradient
        colors={['#283853', '#385195']} // Dark blue gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }} // Horizontal gradient
        style={styles.signInButton}
      >
        <Text style={styles.buttonText}>Sign In</Text>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.5)', 'transparent']} // Glossy effect
          style={styles.glossOverlay}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.6 }}
        />
      </LinearGradient>
    </TouchableOpacity>

    {/* Continue with Google Button */}
    {/* <TouchableOpacity style={styles.googleButton}>
      <Text style={styles.googleButtonText}>Continue with Google</Text>
    </TouchableOpacity> */}

    {/* Sign-Up Link */}
    <View style={{flexDirection: 'row', gap: 5}}>
        <Text style={styles.signUpText}>
            Don't have an account? 
        </Text>
        <TouchableOpacity style={styles.signUpLink} onPress={()=> router.push('../sign-up')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 20,
  backgroundColor: '#f0f4f7',
  fontFamily: "nunito"
},
topImage: {
  width: 300,
  height: 250,
  marginBottom: 20,
  borderRadius: 70,
  color: '#30415E'
},
welcomeText: {
  fontSize: 24,
  marginBottom: 30,
  fontWeight: 'bold',
  textAlign: 'left', // Not centered
  alignSelf: 'flex-start',
  fontFamily: 'nunito-exbold'
},
inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#add8e6',
  borderRadius: 10,
  paddingHorizontal: 10,
  paddingVertical: 7,
  marginBottom: 20,
  width: '100%',
  fontFamily: "nunito-exlight"
},
icon: {
  marginRight: 12,
  opacity: 0.5
},
input: {
  flex: 1,
  height: 32,
  color: '#000',
},
signInButtonContainer: {
  width: '100%',
  marginBottom: 20,
},
signInButton: {
  marginTop: 40,
  paddingVertical: 15,
  borderRadius: 25,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  elevation: 5, // Android shadow
  shadowColor: '#000', // iOS shadow
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
},
buttonText: {
  color: '#fff',
  fontSize: 15,
  fontFamily: 'nunito-semibold'
},
glossOverlay: {
  ...StyleSheet.absoluteFillObject,
  borderRadius: 25,
  backgroundColor: 'transparent',
},
googleButton: {
  paddingVertical: 12,
  borderRadius: 25,
  width: '100%',
  alignItems: 'center',
  marginBottom: 20,
  borderWidth: 1,

},
googleButtonText: {
  color: 'black',
  fontSize: 15,
  fontFamily: 'nunito-semibold'
},
signUpText: {
  color: '#000',
  fontFamily: 'nunito-exlight',
  fontSize: 14,
},
signUpLink: {
  color: '#1e90ff',
  fontFamily: "nunito-semibold"
},
});
  
