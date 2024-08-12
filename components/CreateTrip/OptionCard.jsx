import { View, Text } from 'react-native'
import React from 'react'

export default function OptionCard({option, selectedOption}) {
  return (
    <View style={[{
        padding: 15,
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 15,
        
    }, selectedOption?.id==option?.id && {borderWidth:2}]}>
      <View>
        <Text style={{
          fontSize:18,
          fontFamily: 'nunito-semibold'

        }}>{option.title}</Text>
        <Text style={{
          fontSize: 14,
          fontFamily: 'nunito-exlight',
          paddingTop: 5,
        }}>{option?.desc}</Text>
    </View>
        <Text style={{
          fontSize: 30
        }}>{option.icon}</Text>
    </View>
    
  )
}