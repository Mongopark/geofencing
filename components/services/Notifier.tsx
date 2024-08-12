import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

// Function to request permissions and get the push token
export async function registerForPushNotificationsAsync(): Promise<string | null> {
  let token: string | null = null;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return null;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);
  return token;
}

// Function to send a notification
export async function sendNotification(title: string, body: string, data: object = {}): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: data,
    },
    trigger: { seconds: 2 },
  });
}
