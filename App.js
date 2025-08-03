import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';
import { GlobalProvider } from './src/contexts/globalContext';
import Orientation from 'react-native-orientation-locker';

const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);
  return (
    <SafeAreaProvider>
      <GlobalProvider>
        <AppNavigator />
      </GlobalProvider>
    </SafeAreaProvider>
  );
};

export default App;
