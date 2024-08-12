import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Star1 } from 'iconsax-react-native'
import { useThemeStore, useAuthStore } from "@/components/store";


const ThemeButton = () => {
  const themeChange = useThemeStore((state: any) => state.setTheme);
  const theme = useThemeStore((state: any) => state.color);


return (
  <>        
      <Pressable onPress={themeChange} style={{position: 'absolute', bottom: 100, right: 30, zIndex: 99999}}>
        <View style={{alignItems: 'center', borderColor: theme=='light'?"#0a7ea4":"#ffff", borderWidth: 1, borderRadius: 50, padding: 5}}>
        {theme==='light'?<Image 
        source={require('../../assets/images/dark.jpg')} 
        style={[{ alignSelf: 'center' }, styles.headerImage]} 
      />:<Image 
      source={require('../../assets/images/light.jpg')} 
      style={[{ alignSelf: 'center' }, styles.headerImage]} 
    />}
      </View>
      </Pressable>
  </>
)
}

const styles = StyleSheet.create({
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 50
  }
})

export default ThemeButton