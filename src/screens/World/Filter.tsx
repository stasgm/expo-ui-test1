import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

import ItemSeparator from '../../components/ItemSeparator';
import SubTitle from '../../components/SubTitle';
import { IField, ISortField } from '../../model/types';

interface IState {
  filter: IField[];
  sort: ISortField[];
}

export const Filter = () => {
  const [checked, setChecked] = React.useState('first');

  const [state, setState] = useState<IState>({
    filter: [],
    sort: [],
  });

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
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },
});
