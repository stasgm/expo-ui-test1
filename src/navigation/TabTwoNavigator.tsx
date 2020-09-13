import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { TabTwoParamList } from '../model/types';
import TabTwoScreen from '../screens/TabTwoScreen';

const TabTwoStack = createStackNavigator<TabTwoParamList>();

export const TabTwoNavigator = () => {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen name="TabTwoScreen" component={TabTwoScreen} options={{ headerTitle: 'Tab Two Title' }} />
    </TabTwoStack.Navigator>
  );
};
