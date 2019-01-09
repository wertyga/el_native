import { Permissions, Notifications } from 'expo';
import axios from 'axios';
import { Alert } from 'react-native';

const PUSH_ENDPOINT = 'https://your-server.com/users/push-token';

const sendTokenToSave = ({ userID, deviceToken }) => {
  return axios.post(host('/api/set-device-token'), {userID, deviceToken})
    .catch(e => setTimeout(() => sendTokenToSave({userID, deviceToken}), 60000))
}

export async function registerForPushNotificationsAsync(userID) {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    Alert('Allow notifications')
    return;
  }

  // Get the token that uniquely identifies this device
  let deviceToken = await Notifications.getExpoPushTokenAsync();

  sendTokenToSave({ userID, deviceToken });
}