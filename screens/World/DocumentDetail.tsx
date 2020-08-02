import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Picker } from 'react-native';
import { IData } from '../../types';
import { IconButton, TextInput, useTheme, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export const DocumentDetail = ({ route }: any) => {
  const navigation = useNavigation();
  const { item }: { item: IData } = route?.params;
  const { colors } = useTheme();

  const [selectedValue, setSelectedValue] = useState(["eng", "by", "rus"]);

  const saveEntity = () => {
    console.log('save');
    navigation.navigate('List');
  }

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="content-save-all"
          size={20}
          onPress={saveEntity}
        />
      ),
    });
  }, [navigation]);

  return (
    <ScrollView>
      <View style={styles.container} >
        <TextInput
          mode={'outlined'}
          label={'Название'}
          editable={true}
          value={item?.name}
          style={styles.input}
          theme={{ colors: { placeholder: colors.primary, }, }}
        />
        <View style={styles.separator} />
        <TextInput
          mode={'outlined'}
          label={'Столица'}
          editable={true}
          value={item?.capital}
          style={styles.input}
          theme={{ colors: { placeholder: colors.primary, }, }}
        />
        <View style={styles.separator} />
        <TextInput
          mode={'outlined'}
          label={'Регион'}
          editable={true}
          value={item?.region}
          style={styles.input}
          theme={{ colors: { placeholder: colors.primary, }, }}
        />
        {/*  <List.Section title="Accordions">
          <List.Accordion
            title="Uncontrolled Accordion"
            left={props => <List.Icon {...props} icon="folder" />}>
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>

          <List.Accordion
            title="Controlled Accordion"
            left={props => <List.Icon {...props} icon="folder" />}
            expanded={expanded}
            onPress={handlePress}>
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>
        </List.Section> */}
        {/*         <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Eng" value="0" />
          <Picker.Item label="By" value="1" />
          <Picker.Item label="Rus" value="2" />          
        </Picker>*/}
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
    height: 45,
    // width: '100%',
  },
});
