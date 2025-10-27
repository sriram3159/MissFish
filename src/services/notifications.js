// // notifications.js
// import {
//   getMessaging,
//   requestPermission,
//   getToken,
//   onMessage,
//   onNotificationOpenedApp,
//   getInitialNotification,
// } from '@react-native-firebase/messaging';
// import notifee from '@notifee/react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AuthorizationStatus } from '@react-native-firebase/messaging';

// // Import Firebase app (initialized in firebaseConfig.js)
// import app from './firebaseConfig'; // 👈 Update path if needed

// // Get messaging instance
// const messaging = getMessaging(app);

// // Request permission & get FCM token
// export async function setupNotifications() {
//   try {
//     // Request permission
//     const authStatus = await requestPermission(messaging);
//     const enabled =
//       authStatus === AuthorizationStatus.AUTHORIZED ||
//       authStatus === AuthorizationStatus.PROVISIONAL;

//     if (!enabled) {
//       console.log('Permission not granted');
//       return null;
//     }

//     // Get FCM token
//     const fcmToken = await getToken(messaging);
//     if (fcmToken) {
//       console.log('Your FCM Token:', fcmToken);
//       await AsyncStorage.setItem('fcmToken', fcmToken);
//       return fcmToken;
//     }
//   } catch (error) {
//     console.log('Error during setup:', error);
//   }
// }

// // Create Android channel
// async function createChannel() {
//   return await notifee.createChannel({
//     id: 'default',
//     name: 'Default Channel',
//     importance: notifee.AndroidImportance.HIGH,
//   });
// }

// // Display notification
// export async function displayNotification(remoteMessage) {
//   try {
//     const channelId = await createChannel();

//     await notifee.displayNotification({
//       title:
//         remoteMessage?.notification?.title ||
//         remoteMessage?.data?.title ||
//         'New Notification',
//       body:
//         remoteMessage?.notification?.body ||
//         remoteMessage?.data?.body ||
//         'Tap to view',
//       android: {
//         channelId,
//         smallIcon: 'ic_notification',
//         pressAction: { id: 'default' },
//       },
//     });
//   } catch (error) {
//     console.error('Error displaying notification:', error);
//   }
// }

// // Set up listeners
// export function setupNotificationListeners() {
//   // Foreground
//   onMessage(messaging, async remoteMessage => {
//     console.log('Foreground message:', remoteMessage);
//     await displayNotification(remoteMessage);
//   });

//   // Background / Quit state
//   onNotificationOpenedApp(messaging, remoteMessage => {
//     console.log(
//       'Notification caused app to open from background:',
//       remoteMessage,
//     );
//     displayNotification(remoteMessage);
//   });

//   // App opened from quit state
//   getInitialNotification(messaging).then(remoteMessage => {
//     if (remoteMessage) {
//       console.log(
//         'Notification caused app to open from quit state:',
//         remoteMessage,
//       );
//       displayNotification(remoteMessage);
//     }
//   });
// }
// src/services/notifications.js// notifications.js

// import {
//   getMessaging,
//   getToken,
//   onMessage,
//   onNotificationOpenedApp,
//   getInitialNotification,
//   requestPermission,
//   AuthorizationStatus,
//   onBackgroundMessage,
// } from '@react-native-firebase/messaging';
// import { getApp } from '@react-native-firebase/app'; // 👈 added
// import notifee, {
//   AndroidImportance,
//   AndroidStyle,
// } from '@notifee/react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import api from './api'; // your Axios instance

// // ✅ Initialize messaging with Firebase app instance
// const messagingInstance = getMessaging(getApp());

// /**
//  * Send test notification via backend
//  */
// // export const sendTestNotification = async () => {
// //   try {
// //     const fcmToken = await AsyncStorage.getItem('fcmToken');
// //     if (!fcmToken) {
// //       console.warn(
// //         'No FCM token found. Make sure notifications are setup first.',
// //       );
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append('title', 'Test Notification');
// //     formData.append('subtitle', 'Subtitle for testing');
// //     formData.append('body', 'This is a test notification sent from the app.');

// //     const response = await api.post(
// //       '/notification/send-notification',
// //       formData,
// //       {
// //         headers: { 'Content-Type': 'multipart/form-data' },
// //       },
// //     );

// //     console.log('Test Notification Response:', response.data);
// //   } catch (error) {
// //     console.error('Error sending test notification:', error);
// //   }
// // };

// /**
//  * Subscribe device token to backend topic
//  */
// // export async function subscribeToTopic() {
// //   try {
// //     const fcmToken = await AsyncStorage.getItem('fcmToken');
// //     if (!fcmToken) return;

// //     const response = await api.post('/auth/subscribe-topic', {
// //       fcm_token: fcmToken,
// //     });
// //     console.log('Subscribe Response:', response.data);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Subscribe Error:', error);
// //   }
// // }

// /**
//  * Unsubscribe device token from backend topic
//  */
// // export async function unsubscribeFromTopic() {
// //   try {
// //     const fcmToken = await AsyncStorage.getItem('fcmToken');
// //     if (!fcmToken) return;

// //     const response = await api.post('/auth/unsubscribe-topic', {
// //       fcm_token: fcmToken,
// //     });
// //     console.log('Unsubscribe Response:', response.data);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Unsubscribe Error:', error);
// //   }
// // }

// /**
//  * Create Android notification channel
//  */
// async function createChannel() {
//   return await notifee.createChannel({
//     id: 'default',
//     name: 'Default Channel',
//     importance: AndroidImportance.HIGH,
//     sound: 'default', // 👈 enables sound
//   });
// }

// export async function testNotifee() {
//   try {
//     await notifee.requestPermission();
//     const channelId = await notifee.createChannel({
//       id: 'test',
//       name: 'Test Channel',
//       importance: AndroidImportance.HIGH,
//       sound: 'default',
//     });

//     await notifee.displayNotification({
//       title: 'TEST ICON',
//       body: 'This should show with custom icon!',
//       android: {
//         channelId,
//         smallIcon: 'ic_noti',
//         largeIcon: 'ic_launcher',
//         style: {
//           type: AndroidStyle.BIGTEXT,
//           text: 'If you see this, Notifee is working!',
//         },
//       },
//     });
//   } catch (error) {
//     console.error('Test failed:', error);
//   }
// }

// /**
//  * Setup notification listeners (foreground, background, quit state)
//  */
// // export function setupNotificationListeners() {
// //   // Foreground
// //   onMessage(messagingInstance, async remoteMessage => {
// //     console.log(
// //       '🔔 onMessage (Foreground) triggered:',
// //       JSON.stringify(remoteMessage, null, 2),
// //     );
// //     await displayNotification(remoteMessage);
// //   });

// //   // Background
// //   onNotificationOpenedApp(messagingInstance, async remoteMessage => {
// //     console.log(
// //       '🔔 onNotificationOpenedApp triggered:',
// //       JSON.stringify(remoteMessage, null, 2),
// //     );
// //     await displayNotification(remoteMessage);
// //   });

// //   // Quit state
// //   (async () => {
// //     const remoteMessage = await getInitialNotification(messagingInstance);
// //     if (remoteMessage) {
// //       console.log(
// //         '🔔 getInitialNotification (Quit State) triggered:',
// //         JSON.stringify(remoteMessage, null, 2),
// //       );
// //       await displayNotification(remoteMessage);
// //     } else {
// //       console.log('🔔 No initial notification (app opened normally)');
// //     }
// //   })();
// // }

// /**
//  * Request permission and get FCM token
//  */

// // Add this function to your notifications.js file
// export function logNotification(message) {
//   console.log(`[NOTIFICATION] ${new Date().toISOString()} - ${message}`);
// }

// // Then update your displayNotification like this:
// // export async function displayNotification(remoteMessage) {
// //   logNotification('displayNotification called');
// //   console.log('🔥 Remote Message:', JSON.stringify(remoteMessage, null, 2));

// //   if (!remoteMessage?.data) {
// //     logNotification('❌ No data in remoteMessage');
// //     return;
// //   }

// //   logNotification('✅ Data exists, preparing notification');

// //   try {
// //     await notifee.requestPermission();
// //     const channelId = await createChannel();
// //     logNotification('✅ Channel created');

// //     await notifee.displayNotification({
// //       title: remoteMessage?.data?.title ?? 'No Title',
// //       subtitle: remoteMessage?.data?.subtitle ?? '',
// //       android: {
// //         channelId,
// //         smallIcon: 'ic_noti',
// //         largeIcon: remoteMessage?.data?.image ?? 'ic_launcher',
// //         color: '#0066cc',
// //         circularLargeIcon: true,
// //         showTimestamp: true,
// //         pressAction: { id: 'default' },
// //         importance: AndroidImportance.HIGH,
// //         style: {
// //           type: AndroidStyle.BIGTEXT,
// //           text: remoteMessage?.data?.body || 'No body provided.',
// //         },
// //       },
// //     });

// //     logNotification('✅ Notification displayed successfully');
// //   } catch (error) {
// //     logNotification(`❌ Error: ${error.message}`);
// //     console.error('Full error:', error);
// //   }
// // }
// export const messaging = () => {
//   const app = getApp();
//   const messaging = getMessaging(app);
//   return messaging;
// };

// export async function requestNotificationPermission() {
//   try {
//     const authStatus = await requestPermission(messaging());
//     console.log('authStatus ===', authStatus);

//     const enabled =
//       authStatus === AuthorizationStatus.AUTHORIZED ||
//       authStatus === AuthorizationStatus.PROVISIONAL;
//     if (enabled) {
//       const getToken = await GetFCMToken();
//       return getToken;
//     }
//   } catch (error) {
//     console.log('notification reqest Error ====', error);
//   }
// }

// // export async function setupNotifications() {
// //   try {
// //     const authStatus = await requestPermission(messagingInstance);
// //     const enabled =
// //       authStatus === AuthorizationStatus.AUTHORIZED ||
// //       authStatus === AuthorizationStatus.PROVISIONAL;

// //     if (!enabled) {
// //       console.log('Notification permission not granted');
// //       return null;
// //     }

// //     const fcmToken = await getToken(messagingInstance);
// //     if (fcmToken) {
// //       console.log('Your FCM Token:', fcmToken);
// //       await AsyncStorage.setItem('fcmToken', fcmToken);

// //       // Subscribe token on backend
// //       await api.post('/auth/subscribe-topic', { fcm_token: fcmToken });

// //       return fcmToken;
// //     }
// //   } catch (error) {
// //     console.error('Error in setupNotifications:', error);
// //     return null;
// //   }
// // }

// export async function handleBackgroundMessage(remoteMessage) {
//   console.log('🔔 Background message received:', remoteMessage);

//   try {
//     // Create channel if not exists
//     const channelId = await notifee.createChannel({
//       id: 'default',
//       name: 'Default Channel',
//       importance: AndroidImportance.HIGH,
//       sound: 'default',
//     });

//     // Display notification
//     await notifee.displayNotification({
//       title:
//         remoteMessage?.data?.title ||
//         remoteMessage?.notification?.title ||
//         'New Notification',
//       body:
//         remoteMessage?.data?.body ||
//         remoteMessage?.notification?.body ||
//         'Tap to view',
//       data: remoteMessage.data,
//       android: {
//         channelId,
//         smallIcon: 'ic_noti',
//         largeIcon: remoteMessage?.data?.image || 'ic_launcher',
//         color: '#0066cc',
//         circularLargeIcon: true,
//         showTimestamp: true,
//         pressAction: { id: 'default' },
//         importance: AndroidImportance.HIGH,
//         style: {
//           type: AndroidStyle.BIGTEXT,
//           text:
//             remoteMessage?.data?.body ||
//             remoteMessage?.notification?.body ||
//             'No body provided.',
//         },
//       },
//     });
//   } catch (error) {
//     console.error('Error in background message handler:', error);
//   }
// }

// /**
//  * Register background message handler
//  * This must be called at the top level of your app (not inside a component)
//  */
// export function registerBackgroundHandler() {
//   try {
//     // Register the background handler
//     onBackgroundMessage(messagingInstance, handleBackgroundMessage);
//     console.log('✅ Background message handler registered');
//   } catch (error) {
//     console.error('Error registering background handler:', error);
//   }
// }

// /**
//  * Request permission and get FCM token
//  */
// // export async function setupNotifications() {
// //   try {
// //     const authStatus = await requestPermission(messagingInstance);
// //     const enabled =
// //       authStatus === AuthorizationStatus.AUTHORIZED ||
// //       authStatus === AuthorizationStatus.PROVISIONAL;

// //     if (!enabled) {
// //       console.log('Notification permission not granted');
// //       return null;
// //     }

// //     const fcmToken = await getToken(messagingInstance);
// //     if (fcmToken) {
// //       console.log('Your FCM Token:', fcmToken);
// //       await AsyncStorage.setItem('fcmToken', fcmToken);

// //       // Subscribe token on backend
// //       await api.post('/auth/subscribe-topic', { fcm_token: fcmToken });

// //       return fcmToken;
// //     }
// //   } catch (error) {
// //     console.error('Error in setupNotifications:', error);
// //     return null;
// //   }
// // }

// // In your notifications.js file
// export async function setupNotifications() {
//   try {
//     const authStatus = await requestPermission(messaging);
//     const enabled =
//       authStatus === AuthorizationStatus.AUTHORIZED ||
//       authStatus === AuthorizationStatus.PROVISIONAL;

//     if (!enabled) {
//       console.log('Notification permission not granted');
//       // You might want to show an alert here
//       return null;
//     }

//     const fcmToken = await getToken(messaging);
//     if (fcmToken) {
//       console.log('Your FCM Token:', fcmToken);
//       await AsyncStorage.setItem('fcmToken', fcmToken);

//       // Subscribe to topic
//       await api.post('/auth/subscribe-topic', { fcm_token: fcmToken });
//       return fcmToken;
//     }
//   } catch (error) {
//     console.error('Error in setupNotifications:', error);
//     return null;
//   }
// }

// /**
//  * Setup notification listeners (foreground, background, quit state)
//  */
// export function setupNotificationListeners() {
//   // Foreground messages
//   onMessage(messagingInstance, async remoteMessage => {
//     console.log(
//       '🔔 Foreground message:',
//       JSON.stringify(remoteMessage, null, 2),
//     );
//     await displayNotification(remoteMessage);
//   });

//   // App opened from background/quit state
//   onNotificationOpenedApp(messagingInstance, async remoteMessage => {
//     console.log(
//       '🔔 App opened from notification:',
//       JSON.stringify(remoteMessage, null, 2),
//     );
//     // Handle the notification data here if needed
//   });

//   // Initial notification (app opened from quit state)
//   (async () => {
//     const remoteMessage = await getInitialNotification(messagingInstance);
//     if (remoteMessage) {
//       console.log(
//         '🔔 Initial notification:',
//         JSON.stringify(remoteMessage, null, 2),
//       );
//       // Handle the notification data here if needed
//     }
//   })();
// }

// /**
//  * Display notification (for foreground messages)
//  */
// export async function displayNotification(remoteMessage) {
//   console.log(
//     '🔥 Displaying notification:',
//     JSON.stringify(remoteMessage, null, 2),
//   );

//   try {
//     await notifee.requestPermission();
//     const channelId = await notifee.createChannel({
//       id: 'default',
//       name: 'Default Channel',
//       importance: AndroidImportance.HIGH,
//       sound: 'default',
//     });

//     await notifee.displayNotification({
//       title:
//         remoteMessage?.data?.title ||
//         remoteMessage?.notification?.title ||
//         'New Notification',
//       body:
//         remoteMessage?.data?.body ||
//         remoteMessage?.notification?.body ||
//         'Tap to view',
//       data: remoteMessage.data,
//       android: {
//         channelId,
//         smallIcon: 'ic_noti',
//         largeIcon: remoteMessage?.data?.image || 'ic_launcher',
//         color: '#0066cc',
//         circularLargeIcon: true,
//         showTimestamp: true,
//         pressAction: { id: 'default' },
//         importance: AndroidImportance.HIGH,
//         style: {
//           type: AndroidStyle.BIGTEXT,
//           text:
//             remoteMessage?.data?.body ||
//             remoteMessage?.notification?.body ||
//             'No body provided.',
//         },
//       },
//     });
//   } catch (error) {
//     console.error('Error displaying notification:', error);
//   }
// }

// // Export for backend notification sending
// export async function sendTestNotification() {
//   try {
//     const fcmToken = await AsyncStorage.getItem('fcmToken');
//     if (!fcmToken) {
//       console.warn(
//         'No FCM token found. Make sure notifications are setup first.',
//       );
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', 'Test Notification');
//     formData.append('subtitle', 'Subtitle for testing');
//     formData.append('body', 'This is a test notification sent from the app.');

//     const response = await api.post(
//       '/notification/send-notification',
//       formData,
//       {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       },
//     );

//     console.log('Test Notification Response:', response.data);
//   } catch (error) {
//     console.error('Error sending test notification:', error);
//   }
// }

// export async function subscribeToTopic() {
//   try {
//     const fcmToken = await AsyncStorage.getItem('fcmToken');
//     if (!fcmToken) return;

//     const response = await api.post('/auth/subscribe-topic', {
//       fcm_token: fcmToken,
//     });
//     console.log('Subscribe Response:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Subscribe Error:', error);
//   }
// }

// export async function unsubscribeFromTopic() {
//   try {
//     const fcmToken = await AsyncStorage.getItem('fcmToken');
//     if (!fcmToken) return;

//     const response = await api.post('/auth/unsubscribe-topic', {
//       fcm_token: fcmToken,
//     });
//     console.log('Unsubscribe Response:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Unsubscribe Error:', error);
//   }
// }// src/services/notifications.js
// src/services/notifications.js
import {
  getMessaging,
  getToken,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
  requestPermission,
  AuthorizationStatus,
  // Remove onBackgroundMessage import
  // onBackgroundMessage,
} from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';
import notifee, {
  AndroidImportance,
  AndroidStyle,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

const app = getApp();
const messaging = getMessaging(app);

// Request permission and get FCM token
export async function setupNotifications() {
  try {
    const authStatus = await requestPermission(messaging);
    const enabled =
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      console.log('❌ Notification permission not granted');
      // Optionally show an alert to guide the user to settings
      // Alert.alert("Notifications Required", "Please enable notifications in Settings to receive alerts.");
      return null;
    }

    const fcmToken = await getToken(messaging);
    if (fcmToken) {
      console.log('📱 FCM Token retrieved:', fcmToken);
      await AsyncStorage.setItem('fcmToken', fcmToken);

      // Subscribe token on backend
      try {
        await api.post('/auth/subscribe-topic', { fcm_token: fcmToken });
        console.log('✅ FCM Token subscribed to backend topic');
      } catch (apiError) {
        console.error('❌ Error subscribing token to backend:', apiError);
        // Consider retrying or storing the token for later subscription
      }

      return fcmToken;
    } else {
      console.log('❌ Failed to get FCM token');
    }
  } catch (error) {
    console.error('❌ Error in setupNotifications:', error);
  }
}

// Create Android channel (for notifee to display notifications)
async function createChannel() {
  return await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
    sound: 'default', // Add sound
    vibrationPattern: [100, 200, 100, 200], // Optional vibration
  });
}

// Display notification (used for foreground messages or manual display)
export async function displayNotification(remoteMessage) {
  console.log('🔥 displayNotification called with:', remoteMessage);

  try {
    // Ensure permissions are granted for notifee
    await notifee.requestPermission();

    const channelId = await createChannel();

    await notifee.displayNotification({
      title:
        remoteMessage?.notification?.title ||
        remoteMessage?.data?.title ||
        'New Notification',
      body:
        remoteMessage?.notification?.body ||
        remoteMessage?.data?.body ||
        'Tap to view',
      // Include data payload - CORRECTED SYNTAX using spread operator
      ...remoteMessage.data,
      android: {
        channelId,
        // Ensure 'ic_noti' exists in drawable folders
        smallIcon: 'ic_noti',
        largeIcon: remoteMessage?.data?.image || 'ic_launcher', // Optional
        color: '#0066cc', // Accent color
        pressAction: { id: 'default' },
        importance: AndroidImportance.HIGH,
        // Optional: Style
        style: {
          type: AndroidStyle.BIGTEXT,
          text:
            remoteMessage?.notification?.body ||
            remoteMessage?.data?.body ||
            'No body provided.',
        },
      },
      ios: {
        sound: 'default',
      },
    });
  } catch (error) {
    console.error('❌ Error in displayNotification:', error);
  }
}

// Set up listeners for foreground, background, and quit state notifications
// This is the "standard" approach
export function setupNotificationListeners() {
  // Handle foreground messages (when app is open)
  onMessage(messaging, async remoteMessage => {
    console.log('🔔 onMessage (Foreground) triggered:', remoteMessage);
    // Display the notification manually when the app is in the foreground using notifee
    await displayNotification(remoteMessage);
  });

  // Handle when app is opened from a notification click (background/quit state)
  onNotificationOpenedApp(messaging, remoteMessage => {
    console.log(
      '🔔 onNotificationOpenedApp triggered (Background/Quit):',
      remoteMessage,
    );
    // Handle navigation or state update based on remoteMessage data here
    // Example: navigation.navigate('SpecificScreen', { notificationData: remoteMessage.data });
  });

  // Handle initial notification (app started from quit state via notification)
  getInitialNotification(messaging).then(remoteMessage => {
    if (remoteMessage) {
      console.log(
        '🔔 getInitialNotification (Quit State) triggered:',
        remoteMessage,
      );
      // Handle navigation or state update based on remoteMessage data here
      // Example: navigation.navigate('SpecificScreen', { notificationData: remoteMessage.data });
    } else {
      console.log('🔔 No initial notification (app started normally)');
    }
  });
}

// Optional: Test notifee directly
export async function testNotifeeDisplay() {
  try {
    await notifee.requestPermission();
    const channelId = await createChannel();
    await notifee.displayNotification({
      title: 'Test Notification',
      body: 'This is a test from Notifee directly',
      android: {
        channelId,
        smallIcon: 'ic_noti', // Ensure this exists
      },
    });
    console.log('✅ Test notification displayed via Notifee');
  } catch (error) {
    console.error('❌ Error in testNotifeeDisplay:', error);
  }
}

// --- REMOVED: registerBackgroundHandler function ---
// This function (and onBackgroundMessage) was removed.
// The standard listeners (onMessage, onNotificationOpenedApp, getInitialNotification)
// combined with notifee display are often sufficient for many cases,
// especially if your backend sends messages with a 'notification' object.
// Ensure your backend sends: { "notification": { ... }, "data": { ... } }
