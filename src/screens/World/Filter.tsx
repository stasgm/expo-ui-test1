import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SubTitle from '../../components/SubTitle';
import ItemSeparator from '../../components/ItemSeparator';
import { RadioButton } from 'react-native-paper';

export const Filter = () => {
  const [checked, setChecked] = React.useState('first');

  return (
    <View style={styles.container}>
      <SubTitle>Фильтрация</SubTitle>
      <ItemSeparator />
      <SubTitle>Сортировка</SubTitle>
      <ItemSeparator />
      <RadioButton
        value="По алфавиту"
        status={checked === 'first' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('first')}
      />
      <RadioButton
        value="По населению"
        status={checked === 'second' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('second')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
