// LocationService.ts
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export const requestLocationPermission = async (): Promise<boolean> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required to use this app.');
      return false;
    }
    return true;
  } catch (error) {
    Alert.alert('Error', 'Failed to request location permissions.');
    return false;
  }
};

export const trackUserLocation = (onLocationUpdate: (location: Location.LocationObjectCoords) => void) => {
  return Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: 5000, // Update every 5 seconds
      distanceInterval: 10, // Update if the user moves by 10 meters
    },
    (location) => {
      onLocationUpdate(location.coords);
    }
  );
};
