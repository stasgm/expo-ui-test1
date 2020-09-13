import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Navigation from './src/navigation';
import {
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { AppStoreProvider } from './src/store';


export default function App() {
  return (
    <ActionSheetProvider>
      <AppStoreProvider>
        <PaperProvider theme={DefaultTheme}>
          <Navigation />
          <StatusBar style="inverted" />
        </PaperProvider>
      </AppStoreProvider>
    </ActionSheetProvider>
  );
}