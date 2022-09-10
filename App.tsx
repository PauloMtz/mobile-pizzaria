import { View, StatusBar } from 'react-native';
import { AuthProvider } from './src/contexts/AuthContext';

// expo install @react-navigation/native
// expo install react-native-screens react-native-safe-area-context
// expo install @react-navigation/native-stack
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar 
          backgroundColor="#1d1d2e" 
          barStyle="light-content"
          translucent={false} />
        
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
