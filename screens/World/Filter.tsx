import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const Filter = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Фильтрация</Text>
      <View style={styles.separator} />
      <Text style={styles.title}>Сортировка</Text>
      <View style={styles.separator} />      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
