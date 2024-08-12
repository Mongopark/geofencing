// App.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import MapView, { Marker, Circle, } from 'react-native-maps';
import { requestLocationPermission, trackUserLocation } from '../../services/LocationService';
import Location, { LocationObjectCoords } from 'expo-location';
import { registerForPushNotificationsAsync, sendNotification } from '../../services/Notifier';
import { useThemeStore, useBoundaryStore } from "@/components/store";


const GEOFENCE_TASK = 'GEOFENCE_TASK';

export default function App() {
  const [location, setLocation] = useState<LocationObjectCoords | null>(null);
  const [geofenceCoords, setGeofenceCoords] = useState(null);
  const boundary = useBoundaryStore((state) => state.boundary);
  const [geofenceRadius, setGeofenceRadius] = useState(boundary); // Radius in meters
  const [geofencingEnabled, setGeofencingEnabled] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      const token = await registerForPushNotificationsAsync();
      setExpoPushToken(token);
    }
    fetchToken();
  }, []);


  useEffect(() => {
    if (boundary) {
    setGeofenceRadius(boundary)
    }
  })
  
  

  const handleSendNotification = () => {
    sendNotification("You've got mail! 📬", "Here is the notification body", { data: 'goes here' });
  };

  useEffect(() => {
    const initializeLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) return;

      trackUserLocation((coords) => {
        setLocation(coords);
        console.log(location, boundary);
        console.log(boundary);
      });

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      await Location.startGeofencingAsync(GEOFENCE_TASK, [
        {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          radius: geofenceRadius,
        },
      ]);

      setGeofencingEnabled(true);
    };


    initializeLocation();
  }, []);


  const handleMapPress = (event: any) => {
    const { coordinate } = event.nativeEvent;
    setGeofenceCoords(coordinate);
    setupGeofence(coordinate, geofenceRadius);
    setGeofencingEnabled(true);
    handleSendNotification();
    Alert.alert('Geofence Set', `Geofence has been set at (${coordinate.latitude}, ${coordinate.longitude})`);
    console.log(geofenceCoords);
  };
  

  const setupGeofence = async (coordinate: any, radius: any) => {
    setGeofenceCoords(coordinate);

    await Location.startGeofencingAsync(GEOFENCE_TASK, [
      {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        radius: geofenceRadius,
      },
    ]);
    setGeofencingEnabled(true);
    Alert.alert('Geofence Set', `Geofence has been set at (${coordinate.latitude}, ${coordinate.longitude})`);
  };

  if (!location) {
    return (
      <View style={styles.container}>
        <Text style={{color: 'white'}}>Fetching location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapPress}
      >
        <Marker coordinate={location} title="Your Location" />
        {geofenceCoords && (
          <>
            <Marker coordinate={geofenceCoords} title="Geofence Center" pinColor="blue" />
            <Circle
              center={geofenceCoords}
              radius={geofenceRadius}
              strokeColor="rgba(255, 0, 0, 0.5)"
              fillColor="rgba(255, 0, 0, 0.2)"
            />
          </>
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});