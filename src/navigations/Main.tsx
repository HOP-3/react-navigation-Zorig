import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {RootStackParamList} from '../screens/types';

import HomeScreen from '../screens/Home';
import DetailScreen from '../screens/Detail';

//const Stack = createNativeStackNavigator<RootStackParamList>();
const Stack = createSharedElementStackNavigator();

const options = {
  headerBackTitleVisible: false,
  cardStyleInterpolator: ({current: {progress}}) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

export const Main = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={() => options}
      />
    </Stack.Navigator>
  );
};

export default Main;
