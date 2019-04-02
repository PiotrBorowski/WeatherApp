import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import HourlyScreen from '../screens/HourlyScreen';
import LongTermScreen from '../screens/LongTermScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const HourlyStack = createStackNavigator({
  Links: HourlyScreen,
});

HourlyStack.navigationOptions = {
  tabBarLabel: 'Godzinowa',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-clock'}
    />
  ),
};

const LongTermStack = createStackNavigator({
  Settings: LongTermScreen,
});

LongTermStack.navigationOptions = {
  tabBarLabel: 'Długoterminowa',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-calendar'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  HourlyStack,
  LongTermStack,
});
