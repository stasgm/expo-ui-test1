/* eslint-disable react-native/no-inline-styles */
import { useActionSheet as useExpoActionSheet } from '@expo/react-native-action-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect, useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableHighlight,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { FAB, Searchbar, Colors, Avatar, IconButton } from 'react-native-paper';

import ItemSeparator from '../../components/ItemSeparator';
import { IData, IDataFetch } from '../../model/types';
import { Props } from '../../navigation/WorldNavigator';
import api from '../../services/api';
import { useAppStore } from '../../store';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const list: IData[] = [
  {
    name: 'Belarus',
    alpha2Code: 'BY',
    alpha3Code: 'BYR',
    capital: 'Minsk',
    region: 'europe',
    population: 2,
  },
  {
    name: 'Belgium',
    alpha2Code: 'BE',
    alpha3Code: 'BEL',
    capital: 'Brussels',
    region: 'europe',
    population: 3,
  },
  {
    name: 'India',
    alpha2Code: 'IN',
    alpha3Code: 'IND',
    capital: 'Delhi',
    region: 'asia',
    population: 50,
  },
  {
    name: 'China',
    alpha2Code: 'CH',
    alpha3Code: 'CHI',
    capital: 'Beijin',
    region: 'asia',
    population: 20,
  },
];

const Item = ({ item, onPress, style }: { item: IData; onPress: () => void; style?: { backgroundColor: string } }) => (
  <TouchableHighlight onPress={onPress} style={[styles.item, style]} underlayColor="#DDDDDD">
    <View style={styles.itemContainer}>
      <View style={{ width: 40, justifyContent: 'center' }}>
        <Avatar.Text size={32} label={item.alpha2Code || '?'} style={{ backgroundColor: Colors.blue600 }} />
      </View>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>
            {item.region} - {item.population?.toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);
/*
interface IState {
  filteredList: IData[];
  filter: null | object;
  sort: {
    field: keyof IData;
    direction: 'ASC' | 'DESC';
  };
} */

export default function WorldScreen({ route }: Props) {
  const navigation = useNavigation();
  const { state: appState, actions: appActions } = useAppStore();

  const [serverReq, setServerReq] = useState<IDataFetch>({
    isLoading: false,
    isError: false,
    status: undefined,
  });

  const [controller, setController] = useState(new AbortController());

  const [searchQuery, setSearchQuery] = useState('');

 /*  const [state, setState] = useState<IState>({
    filteredList: [],
    filter: null,
    sort: {
      field: 'name',
      direction: 'ASC',
    },
  });
 */
  const sortArr = useCallback(({ arr, field, dir }: { arr: IData[]; field: keyof IData; dir: 'ASC' | 'DESC' }) => {
    return arr.sort((a, b) => {
      if (a[field] > b[field]) {
        return dir === 'ASC' ? 1 : -1;
      }
      if (b[field] > a[field]) {
        return dir === 'ASC' ? -1 : 1;
      }
      return 0;
    });
  }, []);

  const renderItem = ({ item }: { item: IData }) => (
    <Item
      item={item}
      onPress={() => {
        navigation.navigate('Document', { item });
      }}
    />
  );

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      filteredList: sortArr({
        arr: appState.data.filter((i) => i.name.toUpperCase().includes(searchQuery.toUpperCase())),
        dir: prev.sort.direction,
        field: prev.sort.field,
      }),
    }));
  }, [searchQuery, state.sort, appState.data, sortArr]);

  useEffect(() => {
    if (!serverReq.isError) {
      return;
    }
    setTimeout(() => {
      setServerReq({ isError: false, isLoading: false, status: '' });
    }, 3000);
  }, [serverReq.isError]);
/*
  useEffect(() => {
    if (!route.params?.item) {
      return;
    }
    const { item } = route.params;
    // console.log(item);
    setState((prev) => ({
      ...prev,
      items: appState.data.map((i) => (i.alpha3Code === item.alpha3Code ? item : i)),
    }));
  }, [route.params, route.params?.item, appState.data]); */

  const abortRequest = useCallback(async () => {
    controller.abort();
    setController(new AbortController());
    // setServerReq({ isError: true, isLoading: false, status: err.message });
  }, [controller]);

  const loadData = useCallback(async () => {
    setTimeout(abortRequest, 2000);
    setServerReq({ isError: false, isLoading: true, status: '' });
    try {
      const data = await api.getAllData(controller.signal);
      appActions.addItems(data);
      // setState((prev) => ({ ...prev, filter: null }));
      setServerReq({ isError: false, isLoading: false, status: '' });
      setSearchQuery('');
    } catch (err) {
      setServerReq({ isError: true, isLoading: false, status: err.message === 'Aborted' ? 'Отмена' : err.message });
      // console.log(err);
    }
  }, [abortRequest, appActions, controller.signal]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const showActionSheet = useActionSheet();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon={serverReq.isLoading ? 'cancel' : 'reload'}
          size={20}
          onPress={serverReq.isLoading ? abortRequest : loadData}
        />
      ),
      headerRight: () => (
        <IconButton
          icon="menu"
          size={24}
          onPress={() => {
            showActionSheet([
              {
                title: 'Очистить',
                type: 'destructive',
                onPress: async () => {
                  appActions.deleteAllItems();
                },
              },
              {
                title: 'По континенту',
                onPress: async () => {
                  setState({ ...state, sort: { direction: 'ASC', field: 'region' } });
                },
              },
              {
                title: 'По наименованию',
                onPress: async () => {
                  setState({ ...state, sort: { direction: 'ASC', field: 'name' } });
                },
              },
              {
                title: 'По населению (по убыванию)',
                onPress: async () => {
                  setState({ ...state, sort: { direction: 'DESC', field: 'population' } });
                },
              },
              {
                title: 'По населению (по возрастанию)',
                onPress: async () => {
                  setState({ ...state, sort: { direction: 'ASC', field: 'population' } });
                },
              },
              {
                title: 'Отмена',
                type: 'cancel',
                // onPress: async () => {},
              },
            ]);
          }}
        />
      ),
    });
  }, [abortRequest, appActions, controller, loadData, navigation, serverReq.isLoading, showActionSheet, state]);

  return (
    <SafeAreaView style={styles.container}>
      {serverReq.isError && (
        <View>
          <Text>{serverReq.status}</Text>
        </View>
      )}
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
          onPress={() => navigation.navigate('Filter', { filter: state.filter, sort: state.sort })}
        />
      </View>
      <FlatList
        ListEmptyComponent={<Text style={{ flex: 1, textAlign: 'center' }}>Нет данных</Text>}
        refreshControl={<RefreshControl refreshing={serverReq.isLoading} onRefresh={() => loadData()} />}
        data={state.filteredList}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.list}
      />
      <FAB style={styles.fab} icon="plus" onPress={() => navigation.navigate('Document', {})} />
    </SafeAreaView>
  );
}

export type ActionSheetItem = {
  type?: 'normal' | 'destructive' | 'cancel';
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
          options: items.map((i) => i.title).concat(options.defaultCancel ? ['Cancel'] : []),
          cancelButtonIndex: options.defaultCancel ? items.length : items.findIndex((i) => i.type === 'cancel'),
          destructiveButtonIndex: items.findIndex((i) => i.type === 'destructive'),
        },
        (i) => {
          items[i]?.onPress?.();
        },
      );
    },
    [showActionSheetWithOptions],
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 100,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    marginTop: StatusBar.currentHeight ?? 0,
  },
  cover: {
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  fab: {
    backgroundColor: Colors.blue600,
    bottom: 0,
    margin: 16,
    position: 'absolute',
    right: 0,
  },
  info: {
    fontSize: 10,
  },
  infoContainer: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 7,
  },
  itemContainer: {
    flexDirection: 'row',
  },
  list: {
    paddingBottom: 56 + 16,
  },
  loading: {
    alignSelf: 'center',
    flex: 1,
    fontSize: 20,
    padding: 50,
  },
  popup: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    justifyContent: 'center',
    marginHorizontal: 10,
    minHeight: 80,
  },
  separator: {
    backgroundColor: '#333536',
    height: StyleSheet.hairlineWidth,
  },
  sheet: {
    height: '100%',
    justifyContent: 'flex-end',
    left: 0,
    position: 'absolute',
    right: 0,
    top: Dimensions.get('window').height,
  },
  title: {
    fontSize: 20,
  },
  titleContainer: {
    flex: 1,
  },
});
