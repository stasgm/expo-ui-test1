import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Navigation from './navigation';
import {
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';


export default function App() {
  return (
    <ActionSheetProvider>
      <PaperProvider theme={DefaultTheme}>
        <Navigation />
        <StatusBar style="inverted" />
      </PaperProvider>
    </ActionSheetProvider>
  );
}