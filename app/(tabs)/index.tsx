import { Image, StyleSheet, Platform, Text, View } from 'react-native';

import { HelloWave } from '@/components/component/HelloWave';
import ParallaxScrollView from '@/components/component/ParallaxScrollView';
import { ThemedText } from '@/components/component/ThemedText';
import { ThemedView } from '@/components/component/ThemedView';
import { useColorScheme } from '@/components/hooks/useColorScheme';
import { useThemeStore, useAuthStore } from "@/components/store";
import Pressable from '@/components/component/Pressable';
import { Sun1 } from 'iconsax-react-native';



export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const themeChange = useThemeStore((state: any) => state.setTheme);
  const theme = useThemeStore((state: any) => state.color);


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#0a7ea4', dark: theme == 'light'?'#0a7ea4':'#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/phone-tracker.jpg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedText type="welcome">welcome to
      <HelloWave /></ThemedText>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Geofence It!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={{color: theme=='light' ?'#0a7ea4':'skyblue'}}>App Descripton</ThemedText>
        <ThemedText>
        Welcome to <ThemedText type="defaultSemiBold">Geofence It!</ThemedText> Manage your locations with ease and get notified when you enter or leave designated areas.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={{color: theme=='light' ?'#0a7ea4':'skyblue'}}>Security Feature</ThemedText>
        <ThemedText>
        With Geofence It!, you can monitor your movements, set up geofences, and receive alerts when you cross boundaries.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={{color: theme=='light' ?'#0a7ea4':'skyblue'}}>Get Started</ThemedText>
        <ThemedText>
          To begin to access the benefits of this application, simply click here <ThemedText type="defaultSemiBold">Map Screen</ThemedText> and to access user profile, manage datas, configurations, and instructions of how to use, click here
          <ThemedText type="defaultSemiBold"> Settings Screen</ThemedText>, please allow the location permission where necessary
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: '85%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
