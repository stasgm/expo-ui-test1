import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { WorldParamList } from '../model/types';
import Settings from '../screens/Settings';
import { DocumentDetail } from '../screens/World/DocumentDetail';
import { Filter } from '../screens/World/Filter';
import WorldScreen from '../screens/World/List';

export const WorldNavigator = () => {
  return (
    <WorldStack.Navigator>
      <WorldStack.Screen
        name="List"
        component={WorldScreen}
        options={{
          headerTitle: 'Мир',
          headerTitleAlign: 'center',
        }}
      />
      <WorldStack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Настройки',
        }}
      />
      <WorldStack.Screen
        name="Filter"
        component={Filter}
        options={{
          title: 'Фильтр',
        }}
      />
      <WorldStack.Screen name="Document" component={DocumentDetail} />
    </WorldStack.Navigator>
  );
};

const WorldStack = createStackNavigator<WorldParamList>();
