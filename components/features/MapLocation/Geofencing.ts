import { Alert, Platform } from 'react-native';
import * as Permissions from 'expo-permissions';

export const requestPermissions = async () => {
  // Request foreground location permission
  let { status } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);

  if (status !== 'granted') {
    Alert.alert('Permission Denied', 'Foreground location permission is required.');
    return false;
  }

  // Request background location permission for both iOS and Android
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    const { status: backgroundStatus } = await Permissions.askAsync(Permissions.LOCATION_BACKGROUND);

    if (backgroundStatus !== 'granted') {
      Alert.alert('Permission Denied', 'Background location permission is required.');
      return false;
    }
  }

  return true;
};
