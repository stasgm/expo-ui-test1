import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Picker, Dimensions } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { IData } from '../../types';
import { IconButton, TextInput, Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { DetailProps } from '../../navigation/WorldNavigator';

export const DocumentDetail = ({ route }: DetailProps) => {
  const navigation = useNavigation();

  const [state, setState] = useState<IData>({} as IData);

  useEffect(() => {
    if (!route.params?.item) return;
    const { item } = route.params;
    setState(item);
  }, [route.params?.item]);

  const saveEntity = () => {
    if (!state) return;
    navigation.navigate('List', { item: state });
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="content-save-all"
          size={24}
          onPress={saveEntity}
        />
      ),
    });
  }, [navigation, saveEntity]);

  const { height, width } = Dimensions.get("window")  
  
  return (
    <ScrollView>
      <View style={styles.container} >
        {/* {state.flag ? <SvgUri uri={state.flag} viewBox={`0 0 720 720`} width="100%" height="100%" opacity={0.5}/> : <></>} */}
        <TextInput
          mode={'outlined'}
          label={'Название'}
          editable={true}
          value={state?.name}
          onChangeText={(e) => setState({ ...state, name: e })}
          style={styles.input}
          theme={{ colors: { placeholder: Colors.blue600, primary: Colors.red600 }, }}
        />
        <View style={styles.separator} />
        <TextInput
          mode={'outlined'}
          label={'Столица'}
          editable={true}
          onChangeText={(e) => setState({ ...state, capital: e })}
          value={state?.capital}
          style={styles.input}
          theme={{ colors: { placeholder: Colors.blue600, primary: Colors.red600 }, }}
        />
        <View style={styles.separator} />
        <TextInput
          mode={'outlined'}
          label={'Регион'}
          editable={true}
          onChangeText={(e) => setState({ ...state, region: e })}
          value={state?.region}
          style={styles.input}
          theme={{ colors: { placeholder: Colors.blue600, primary: Colors.red600 }, }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: 5,
    display: 'flex',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 1,
    height: 1,
    width: '80%',
  },
  input: {
    fontSize: 16,
    flex: 1,
  },
});
