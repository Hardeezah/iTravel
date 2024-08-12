import { Text, View } from "react-native";
import Login from './../components/Login'
import {auth} from './../config/FirebaseConfig'
import { Redirect } from "expo-router";
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens();

export default function Index() {
  const user = auth.currentUser;
  console.log(user);
  
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {user? 
        <Redirect href={'/mytrip'}/>:  
        <Login/>
      }  
</View>
  );
}
