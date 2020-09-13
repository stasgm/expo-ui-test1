import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { IconButton } from 'react-native-paper';

import { WorldParamList } from '../model/types';
import Settings from '../screens/Settings';
import { DocumentDetail } from '../screens/World/DocumentDetail';
import { Filter } from '../screens/World/Filter';
import WorldScreen from '../screens/World/List';

export const WorldNavigator = ({ navigation }: Props) => {
  return (
    <WorldStack.Navigator>
      <WorldStack.Screen
        name="List"
        component={WorldScreen}
        options={{
          headerTitle: 'Мир',
          headerTitleAlign: 'center',
          headerLeft: ({ tintColor }) => {
            return (
              <IconButton
                icon="settings"
                background={tintColor}
                size={20}
                onPress={() => navigation.navigate('Settings')}
              />
            );
          },
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

export type Props = StackScreenProps<WorldParamList, 'List'>;
export type DetailProps = StackScreenProps<WorldParamList, 'Document'>;
