import React, { useRef, useCallback } from 'react';
import { FlatList, Text, View, StyleSheet, StatusBar, SafeAreaView, TouchableHighlight, Platform, RefreshControl, Modal, Animated, Dimensions, TouchableOpacity, ImageEditor } from 'react-native';
import { useState, useEffect } from 'react';
import { FAB, Searchbar, Colors, Avatar, IconButton, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { IData } from '../../types';
import { useActionSheet as useExpoActionSheet } from '@expo/react-native-action-sheet';
import { DetailProps, Props } from '../../navigation/WorldNavigator';

const ItemSeparator = ({ highlighted }: { highlighted: boolean }) => {
  return (
    <View
      style={[
        styles.separator,
        highlighted && { marginLeft: 0 }
      ]}
    />
  )
};

const Item = ({ item, onPress, style }: { item: IData, onPress: () => void, style?: { backgroundColor: string; } }) => (
  <TouchableHighlight
    onPress={onPress}
    style={[styles.item, style]}
    underlayColor="#DDDDDD"
  >
    <View style={styles.itemContainer}>
      <View style={{ width: 40, justifyContent: 'center' }}>
        <Avatar.Text size={32} label={item.alpha2Code || '?'} style={{ backgroundColor: Colors.blue600 }} />
      </View>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{item.region} - {item.population?.toLocaleString()}</Text>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

interface IState {
  error: null | string,
  isLoaded: boolean,
  items: IData[],
  filteredList: IData[],
  filter: null | Object,
  sort: {
    field: keyof IData,
    direction: 'ASC' | 'DESC'
  },
}

export default function WorldScreen({ route }: Props) {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = React.useState('');

  const [state, setState] = useState<IState>({
    error: null,
    isLoaded: false,
    items: [],
    filteredList: [],
    filter: null,
    sort: {
      field: 'name',
      direction: 'ASC'
    },
  })

  const renderItem = ({ item }: { item: IData }) => (
    <Item
      item={item}
      onPress={() => {
        navigation.navigate('Document', { item })
      }}
    />
  );

  const clearList = useCallback(() => {
    setState({ ...state, items: [], filteredList: [] });
  }, []);

  useEffect(() => {
    setState({
      ...state,
      filteredList: sortArr({
        arr: state.items.filter(i => i.name.toUpperCase().includes(searchQuery.toUpperCase())),
        dir: state.sort.direction,
        field: state.sort.field
      })
    })
  }, [searchQuery, state.sort, state.items])

  React.useEffect(() => {
    if (!route.params?.item) return;
    const { item } = route.params;
    setState({
      ...state,
      items: state.items.map(i => i.alpha3Code == item.alpha3Code ? item : i)
    });
  }, [route.params?.item]);

  const loadData = useCallback(async () => {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const data: IData[] = await res.json();
    setState({ ...state, error: null, isLoaded: true, items: data, filteredList: data, filter: null, });
    setSearchQuery('');
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const sortArr = ({ arr, field, dir }: { arr: IData[], field: keyof IData, dir: 'ASC' | 'DESC' }) => {
    return arr.sort(function (a, b) {
      if (a[field]! > b[field]!) {
        return (dir === 'ASC') ? 1 : -1;
      }
      if (b[field]! > a[field]!) {
        return (dir === 'ASC') ? -1 : 1;
      }
      return 0;
    })
  }


  const showActionSheet = useActionSheet();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="menu"
          size={24}
          onPress={() => {
            showActionSheet(
              [
                {
                  title: "Очистить",
                  type: 'destructive',
                  onPress: async () => {
                    clearList();
                  },
                },
                {
                  title: "По континенту",
                  onPress: async () => {
                    setState({ ...state, sort: { direction: 'ASC', field: 'region' } });
                  },
                },
                {
                  title: "По наименованию",
                  onPress: async () => {
                    setState({ ...state, sort: { direction: 'ASC', field: 'name' } });
                  },
                },
                {
                  title: "По населению (по убыванию)",
                  onPress: async () => {
                    setState({ ...state, sort: { direction: 'DESC', field: 'population' } });
                  },
                },
                {
                  title: "По населению (по возрастанию)",
                  onPress: async () => {
                    setState({ ...state, sort: { direction: 'ASC', field: 'population' } });
                  },
                },
                {
                  title: "Cancel",
                  type: 'cancel',
                  onPress: async () => {

                  },
                },
              ]
            )
          }
          }
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', borderBottomWidth: styles.separator.height }}>
        <Searchbar
          placeholder="Поиск"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{ shadowOpacity: 0, flex: 1 }}
        />
        <IconButton
          icon="filter"
          color={state.filter ? Colors.red500 : Colors.black}
          size={24}
          style={{ width: 36 }}
          onPress={() =>
            setState({ ...state, filter: { name: 'name' } })}
        />
      </View>
      <FlatList
        ListEmptyComponent={
          <Text style={{ flex: 1, textAlign: 'center' }}>Нет данных</Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={!state.isLoaded}
            onRefresh={() => loadData()}
          />}
        data={state.filteredList} renderItem={renderItem}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.list}
      />
      <FAB
        style={[
          styles.fab
        ]}
        icon="plus"
        onPress={() => navigation.navigate('Document', {})}
      />
    </SafeAreaView >
  );
}


export type ActionSheetItem = {
  type?: "normal" | "destructive" | "cancel";
  title: string;
  onPress?: () => void;
};

export interface ActionSheetOptions {
  title?: string;
  message?: string;
  tintColor?: string;
  anchor?: number;
  defaultCancel?: boolean;
}

const useActionSheet = () => {
  const { showActionSheetWithOptions } = useExpoActionSheet();
  return useCallback(
    (items: ActionSheetItem[], options: Partial<ActionSheetOptions> = {}) => {
      showActionSheetWithOptions(
        {
          ...options,
          options: items
            .map((i) => i.title)
            .concat(options.defaultCancel ? ["Cancel"] : []),
          cancelButtonIndex: options.defaultCancel
            ? items.length
            : items.findIndex((i) => i.type === "cancel"),
          destructiveButtonIndex: items.findIndex(
            (i) => i.type === "destructive"
          ),
        },
        (i) => {
          items[i]?.onPress?.();
        }
      );
    },
    [showActionSheetWithOptions]
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 100,
  },
  itemContainer: {
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: StatusBar.currentHeight || 0,
  },
  titleContainer:
  {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
  },
  list: {
    paddingBottom: 56 + 16,
  },
  loading: {
    flex: 1,
    fontSize: 20,
    padding: 50,
    alignSelf: 'center',
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 7,
  },
  title: {
    fontSize: 20,
  },
  info: {
    fontSize: 10,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#333536'
  },
  fab: {
    backgroundColor: Colors.blue600,
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  cover: {
    backgroundColor: "rgba(0,0,0,.5)",
  },
  sheet: {
    position: "absolute",
    top: Dimensions.get("window").height,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end",
  },
  popup: {
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 80,
  },
});