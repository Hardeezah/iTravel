import {StyleSheet, Text, View, SafeAreaView, ActivityIndicator} from 'react-native';import React, { useEffect, useState } from 'react'
import StartTripCard from '../../components/MyTrips/StartTripCard';
import { auth, db } from '../../config/FirebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import UserTripList from '../../components/MyTrips/UserTripList';

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const user= auth.currentUser;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && GetMyTrips()
  }, [user])


  const GetMyTrips = async() => {
    setLoading(true);
    setUserTrips([])
    const q= query(collection(db,'UserTrips'),where('userEmail','==',user?.email));
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data())
      setUserTrips(prev=>[...prev,doc.data()])
    });

    setLoading(false);
  }

  return (
    <SafeAreaView>
      <View style={{
        padding:25,
        height:'100%',
      }}>
          <Text style={{
            fontFamily:'nunito-exbold',
            fontSize:25,
            marginTop: 25
          }}>My Trips</Text>
        {loading && <ActivityIndicator size={'large'} color="#3065CF"/>}
        {userTrips?.length==0? <StartTripCard/>: <UserTripList userTrips={userTrips}/>}
      </View>
    </SafeAreaView>
  )
}
  
