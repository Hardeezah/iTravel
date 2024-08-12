import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { TripProvider } from '../contexts/TripContext';
export default function RootLayout() {

  useFonts({
    'nunito':require('./../assets/fonts/Nunito-Regular.ttf'),
    'nunito-medium':require('./../assets/fonts/Nunito-Medium.ttf'),
    'nunito-exbold':require('./../assets/fonts/Nunito-ExtraBold.ttf'),
    'nunito-semibold':require('./../assets/fonts/Nunito-SemiBold.ttf'),
    'nunito-exlight':require('./../assets/fonts/Nunito-ExtraLight.ttf')
  })

  return (
    <TripProvider>
      <Stack screenOptions={{
        headerShown: false
      }}>
        {/* <Stack.Screen name="index" options={{
          headerShown: false
        }}/> */}
        <Stack.Screen name="(tabs)"/>
      </Stack>
    </TripProvider>
  );
}
