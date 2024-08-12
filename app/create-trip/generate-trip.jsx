import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTrip } from '../../contexts/TripContext';
import { AI_Prompt } from '../../constants/Options';
import { chatSession } from '../../config/AiModel';
import { useRouter } from 'expo-router';
import {auth,db} from './../../config/FirebaseConfig'
import { doc, setDoc } from 'firebase/firestore';

export default function generateTrip() {
  const { tripData } = useTrip();
  const [loading, setLoading] = useState(false);
  const router=useRouter();
  const user=auth.currentUser;

  useEffect(() => {
    tripData && GenerateAiTrip()
  }, []);

  const GenerateAiTrip= async() =>{
    setLoading(true);

    const FINAL_PROMPT = AI_Prompt
    .replace('{place}',tripData.place)
    .replace('{totalNoOfDays}',tripData.totalNoOfDays)
    .replace('{Night}',tripData.totalNoOfDays - 1)
    .replace('{traveler.title}',tripData.traveler?.title)
    .replace('{budget.title}',tripData.budget?.title)
    .replace('{totalNoOfDays}',tripData.totalNoOfDays)
    .replace('{Night}',tripData.totalNoOfDays - 1)

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text()); 

    const tripResponse =JSON.parse(result.response.text());

    setLoading(false)
    const docId =(Date.now()).toString();
    const _result = await setDoc(doc(db,"UserTrips", docId), {
      userEmail:user.email,
      tripList: tripResponse,
      tripData: JSON.stringify(tripData),
      docId: docId
    })
    
    router.push('/mytrip')
    
  }
  return (
    <View style={{
        paddingHorizontal: 25,
        paddingTop: 20,
        height: '100%',
        alignSelf: 'center',
        justifyContent: 'center'
    }}>
      <Text style={{
                fontFamily: 'nunito-semibold',
                fontSize: 20,
                marginTop: 20
         }}>Generating Itineraries...</Text>

    <Text style={{
                fontFamily: 'nunito-exlight',
                fontSize: 12,
                marginTop: 5
         }}>Hold still while we work our magic. Do not back</Text>

         <Image source={require('./../../assets/images/loader.gif')}
            style={{
                alignSelf: 'center',
            }}
         />
    </View>
  )
}