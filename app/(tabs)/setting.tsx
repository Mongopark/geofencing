import React from 'react'
import { Text, View } from 'react-native'
import SettingScreen from '@/components/features/Settings/SettingScreen';

const map = () => {
  return (
    <View style={{flex: 1}}>
        <Text>setting</Text>
        <SettingScreen />
        </View>
  )
}

export default map