import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { TabTwoParamList } from '../model/types';
import BarcodeScreen from '../screens/Barcode';
import TabTwoScreen from '../screens/TabTwoScreen';

const TabTwoStack = createStackNavigator<TabTwoParamList>();

export const TabTwoNavigator = () => {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen name="TabTwoScreen" component={TabTwoScreen} options={{ headerTitle: 'Tab Two Title' }} />
      <TabTwoStack.Screen name="BarcodeScreen" component={BarcodeScreen} options={{ headerTitle: 'Barcode' }} />
    </TabTwoStack.Navigator>
  );
};
