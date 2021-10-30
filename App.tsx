import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import MainTab from './src/navigations';

const App = () => {
  return (
    <NavigationContainer>
      <MainTab />
    </NavigationContainer>
  );
};

export default App;
