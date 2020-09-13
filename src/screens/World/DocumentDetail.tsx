import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { IconButton, TextInput, Colors } from 'react-native-paper';

import { IData } from '../../model/types';
import { DetailProps } from '../../navigation/WorldNavigator';

export const DocumentDetail = ({ route }: DetailProps) => {
  const navigation = useNavigation();

  const [state, setState] = useState<IData>({} as IData);

  useEffect(() => {
    if (!route.params?.item) {
      return;
    }
    const { item } = route.params;
    setState(item);
  }, [route.params, route.params?.item]);

  const saveEntity = useCallback(() => {
    if (!state) {
      return;
    }
    navigation.navigate('List', { item: state });
  }, [navigation, state]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconButton icon="content-save-all" size={24} onPress={saveEntity} />,
    });
  }, [navigation, saveEntity]);

  // const { height, width } = Dimensions.get('window');

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* {state.flag ? <SvgUri uri={state.flag} viewBox={`0 0 720 720`} width="100%" height="100%" opacity={0.5}/> : <></>} */}
        <TextInput
          mode={'outlined'}
          label={'Название'}
          editable={true}
          value={state?.name}
          onChangeText={(e) => setState({ ...state, name: e })}
          style={styles.input}
          theme={{ colors: { placeholder: Colors.blue600, primary: Colors.red600 } }}
        />
        <View style={styles.separator} />
        <TextInput
          mode={'outlined'}
          label={'Столица'}
          editable={true}
          onChangeText={(e) => setState({ ...state, capital: e })}
          value={state?.capital}
          style={styles.input}
          theme={{ colors: { placeholder: Colors.blue600, primary: Colors.red600 } }}
        />
        <View style={styles.separator} />
        <TextInput
          mode={'outlined'}
          label={'Регион'}
          editable={true}
          onChangeText={(e) => setState({ ...state, region: e })}
          value={state?.region}
          style={styles.input}
          theme={{ colors: { placeholder: Colors.blue600, primary: Colors.red600 } }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  separator: {
    height: 1,
    marginVertical: 1,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
