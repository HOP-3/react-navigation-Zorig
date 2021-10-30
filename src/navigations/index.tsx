import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Main from '../navigations/Main';
import Chat from '../screens/Chat';

const Tabs = createBottomTabNavigator();

const screenOptions = ({route}) => ({
  tabBarIcon: () => (
    <Ionicons name={route.name === 'Main' ? 'home' : 'chatbubbles'} size={30} />
  ),
});

const MainTab = () => {
  return (
    <Tabs.Navigator screenOptions={screenOptions}>
      <Tabs.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />
      <Tabs.Screen name="Chat" component={Chat} />
    </Tabs.Navigator>
  );
};

export default MainTab;
