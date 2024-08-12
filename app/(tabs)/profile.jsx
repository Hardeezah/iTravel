import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { auth } from '../../config/FirebaseConfig';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';

export default function profile() {
  const user=auth.currentUser;
  const router = useRouter();

  const signOutUser = () => {
    signOut(auth).then(() => {
      router.replace('./../auth/sign-in')
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <View style={{
      paddingHorizontal: 25,
      paddingTop: 20,
      height: '100%',
      alignSelf: 'center',
      justifyContent: 'center',
      gap: 30
      }}>
        <View>
          <View style={{
            alignSelf: 'center',
            justifyContent: 'center',
            padding: 25,
            backgroundColor:'#344B85',
            borderRadius:75
          }}>
            <Ionicons name="person" size={76} color="#ffff" />
            
          </View>
          <Text style={{
              fontFamily: 'nunito-exbold',
              fontSize: 20,
              alignSelf: 'center',
              justifyContent: 'center',
              paddingTop:10
            }}>User Information</Text>
          </View>

        <View>
          
          <Text style={{
            fontFamily: 'nunito-exlight',
          }}>
            <Text style={{
              fontFamily:'nunito-semibold',
            }}>Email:  </Text>
            {user.email}
            
           </Text>
           <Text style={{
            fontFamily: 'nunito-exlight',
            marginTop:5
          }}>
            <Text style={{
              fontFamily:'nunito-semibold',
            }}>Username:  </Text>
            {user.displayName}
            
           </Text>

        </View>

        <TouchableOpacity 
              onPress={signOutUser}
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
                }}>Log Out</Text>
            </TouchableOpacity>
    </View>
  )
}