import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import WorldScreen from '../screens/World/List';
import { WorldParamList } from '../types';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import Settings from '../screens/Settings';
import { RouteProp } from '@react-navigation/native';
import { DocumentDetail } from '../screens/World/DocumentDetail';

export const WorldNavigator = ({ route, navigation }: Props) => {
  return (
    <WorldStack.Navigator>
      <WorldStack.Screen
        name="List"
        component={WorldScreen}
        options={{
          headerTitle: 'World',
          headerTitleAlign: 'center',
          headerRight: ({ tintColor }) => {
            return (
              <IconButton
                icon="settings"
                // color={ tintColor}
                // background={ tintColor }
                size={20}
                onPress={() => navigation.navigate('Settings')}
              />
            )
          },
          headerLeft: ({ tintColor }) => {
            return (
              <IconButton
                icon="rocket"
                size={20}
                onPress={() => console.log('Pressed')}
              />
            )
          },
        }}
      />
      <WorldStack.Screen name="Settings" component={Settings} />
      <WorldStack.Screen name="Document" component={DocumentDetail} />
    </WorldStack.Navigator>
  );
}

const WorldStack = createStackNavigator<WorldParamList>();

type ListScreenRouteProp = RouteProp<WorldParamList, 'List'>;

type ListScreenNavigationProp = StackNavigationProp<
  WorldParamList,
  'List'
>;
type Props = {
  route: ListScreenRouteProp;
  navigation: ListScreenNavigationProp;
};

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
