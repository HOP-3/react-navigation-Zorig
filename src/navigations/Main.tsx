import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../screens/types';

import HomeScreen from '../screens/Home';
import DetailScreen from '../screens/Detail';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Main = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default Main;
