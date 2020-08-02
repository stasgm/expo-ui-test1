import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import TabTwoScreen from '../screens/TabTwoScreen';
import { StyleSheet } from 'react-native';
import { TabTwoParamList } from '../types';

const TabTwoStack = createStackNavigator<TabTwoParamList>();

export const TabTwoNavigator = () => {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    padding: 8,
  },
  button: {
    margin: 8,
  },
  banner: {
    textAlign: 'center',
    color: 'tomato',
    backgroundColor: 'papayawhip',
    padding: 4,
  },
});
