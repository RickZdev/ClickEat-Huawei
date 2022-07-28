import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import { LogBox } from 'react-native';
import HuaweiMap from './src/hms-kit/HuaweiMap';

const App = () => {
  LogBox.ignoreLogs(['Warning: AsyncStorage has been extracted from react-native core']);
  LogBox.ignoreAllLogs(true)
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
    // <HuaweiMap />
  );
};

export default App;
