import { Fontisto } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { BottomTabParamList } from '../model/types';
import { TabTwoNavigator } from './TabTwoNavigator';
import { WorldNavigator } from './WorldNavigator';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="World" tabBarOptions={{}}>
      <BottomTab.Screen
        name="World"
        component={WorldNavigator}
        options={{
          title: 'World',
          tabBarLabel: 'Мир',
          tabBarIcon: ({ color }) => <TabBarIcon name="world" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          title: 'Config',
          tabBarIcon: ({ color }) => <TabBarIcon name="webpack" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: string; color: string }) {
  // eslint-disable-next-line react-native/no-inline-styles
  return <Fontisto size={28} style={{ marginBottom: -3 }} {...props} />;
}
