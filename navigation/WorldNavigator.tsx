import { createStackNavigator, StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React from 'react';

import WorldScreen from '../screens/World/List';
import { WorldParamList, IDetailParams } from '../types';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import Settings from '../screens/Settings';
import { RouteProp } from '@react-navigation/native';
import { DocumentDetail } from '../screens/World/DocumentDetail';
import { Filter } from '../screens/World/Filter';

export const WorldNavigator = ({ route, navigation }: Props) => {
  return (
    <WorldStack.Navigator>
      <WorldStack.Screen
        name="List"
        component={WorldScreen}
        options={{
          headerTitle: 'World',
          headerTitleAlign: 'center',
          headerLeft: ({ tintColor }) => {
            return (
              <IconButton
                icon="settings"
                background={ tintColor }
                size={20}
                onPress={() => navigation.navigate('Settings')}
              />
            )
          },
        }}
      />
      <WorldStack.Screen name="Settings" component={Settings} />
      <WorldStack.Screen name="Filter" component={Filter} />      
      <WorldStack.Screen name="Document" component={DocumentDetail} />
    </WorldStack.Navigator>
  );
}

const WorldStack = createStackNavigator<WorldParamList>();

export type Props = StackScreenProps<WorldParamList, 'List'>;
export type DetailProps = StackScreenProps<WorldParamList, 'Document'>;

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
