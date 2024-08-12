import React from 'react'
import { Text, View } from 'react-native'
import MapLocationScreen from '@/components/features/MapLocation/MapLocationScreen';

const map = () => {
  return (
    <View style={{flex: 1}}>
        <Text>map</Text>
        <MapLocationScreen />
        </View>
  )
}

export default map