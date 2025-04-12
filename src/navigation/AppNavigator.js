import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import CameraScreen from '../screens/CameraScreen';
import PreviewScreen from '../screens/PreviewScreen';
import SummaryScreen from '../screens/SummaryScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: 'white' },
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Preview" component={PreviewScreen} />
          <Stack.Screen name="Summary" component={SummaryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default AppNavigator;