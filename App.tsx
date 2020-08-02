import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Navigation from './navigation';
import {
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider theme={DefaultTheme}>
      <Navigation />
      <StatusBar style="inverted" />
    </PaperProvider>
  );
}