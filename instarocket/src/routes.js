import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import { Image } from 'react-native';

import Feed from './pages/Feed';
import New from './pages/New';

import logo from './assets/logo.png';

export default createAppContainer(
  createStackNavigator({
    Feed,
    New,
  }, {
    defaultNavigationOptions: {
      headerTitle: <Image source={logo}/>,
      headerTintColor: '#000',
      headerBackTitle: null,
    },
    mode: 'modal',
    headerLayoutPreset: 'center',
  }),
);
