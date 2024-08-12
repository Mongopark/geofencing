import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/components/constants/Colors';
import { useColorScheme } from '@/components/hooks/useColorScheme';
import { useThemeStore } from "@/components/store";
import { Text } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = useThemeStore((state: any) => state.color);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={theme === 'light' ? '#0a7ea4': 'sky-blue'} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? theme=='light'?'#0a7ea4':'white' : 'gray', fontSize: 10, fontWeight: '700' }}>Home</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'globe' : 'globe-outline'} color={theme === 'light' ? '#0a7ea4': 'sky-blue'} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? theme=='light'?'#0a7ea4':'white' : 'gray', fontSize: 10, fontWeight: '700' }}>Map</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Setting',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={theme === 'light' ? '#0a7ea4': 'sky-blue'} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? theme=='light'?'#0a7ea4':'white' : 'gray', fontSize: 10, fontWeight: '700' }}>Setting</Text>
          ),
        }}
      />
    </Tabs>
  );
}
