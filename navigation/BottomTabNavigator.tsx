import { Fontisto } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { BottomTabParamList } from '../types';

import { WorldNavigator } from './WorldNavigator';
import { TabTwoNavigator } from './TabTwoNavigator';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="World"
      tabBarOptions={{}}>
      <BottomTab.Screen
        name="World"        
        component={WorldNavigator}
        options={{
          title: 'World',
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
  return <Fontisto size={30} style={{ marginBottom: -3 }} {...props} />;
}
