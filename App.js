// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { Provider as PaperProvider } from 'react-native-paper';
// import Orientation from 'react-native-orientation-locker';
// import { useEffect } from 'react';

// import AppNavigator from './src/navigation/AppNavigator';
// import { GlobalProvider } from './src/contexts/globalContext';
// import { AuthProvider } from './src/contexts/AuthContext';
// import {
//   registerBackgroundHandler,
//   setupNotificationListeners,
//   setupNotifications,
// } from './src/services/notifications';
// // import LocationGate from './src/components/LocationGate';

// const App = () => {
//   useEffect(() => {
//     Orientation.lockToPortrait();
//   }, []);
//   useEffect(() => {
//     registerBackgroundHandler();
//     setupNotifications(); // Gets token + asks permission
//     setupNotificationListeners(); // Listens for incoming messages
//   }, []);

//   return (
//     <SafeAreaProvider>
//       <PaperProvider>
//         <AuthProvider>
//           <GlobalProvider>
//             {/* <LocationGate> */}
//             <AppNavigator />
//             {/* </LocationGate> */}
//           </GlobalProvider>
//         </AuthProvider>
//       </PaperProvider>
//     </SafeAreaProvider>
//   );
// };

// export default App;

// App.js
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import Orientation from 'react-native-orientation-locker';
import { useEffect, useState } from 'react';

import AppNavigator from './src/navigation/AppNavigator';
import { GlobalProvider } from './src/contexts/globalContext';
import { AuthProvider } from './src/contexts/AuthContext';
// Import registerBackgroundHandler
import {
  registerBackgroundHandler, // ✅ Add this import
  setupNotificationListeners,
  setupNotifications,
} from './src/services/notifications';

const App = () => {
  const [permissionsChecked, setPermissionsChecked] = useState(false);

  useEffect(() => {
    Orientation.lockToPortrait();

    // Setup notifications and listeners
    const initializeNotifications = async () => {
      await setupNotifications(); // Gets token and subscribes
      setupNotificationListeners(); // Sets up onMessage, etc.
      setPermissionsChecked(true);
    };

    initializeNotifications();

    // Optional: Add a cleanup function if needed
    // return () => { ... };
  }, []);

  if (!permissionsChecked) {
    return null; // Or a loading component
  }

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AuthProvider>
          <GlobalProvider>
            <AppNavigator />
          </GlobalProvider>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
