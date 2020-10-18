/* eslint-disable react-native/no-inline-styles */
import { useActionSheet as useExpoActionSheet } from '@expo/react-native-action-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect, useState, useEffect, useRef } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Animated,
  TouchableHighlight,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { FAB, Searchbar, Colors, Avatar, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ItemSeparator from '../../components/ItemSeparator';
import { IData, IDataFetch, IForm } from '../../model/types';
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

const Item = ({ item, onPress, style }: { item: IData; onPress: () => void; style?: { backgroundColor: string } }) => {
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);

  let ref = useRef(null);

  const updateRef = (_ref) => {
    ref = _ref;
  };

  const renderRightActions = (progress: any) => (
    <View style={{ width: 120, flexDirection: 'row' }}>
      {renderRightAction('star', '#ffab00', 120, progress)}
      {renderRightAction('delete-forever', '#dd2c00', 60, progress)}
      {/* {renderRightAction('mode-edit', '#ffab00', 120, progress)} */}
    </View>
  );
  const renderRightAction = (icon, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [x, 0, 1],
    });
    const pressHandler = () => {
      ((ref as unknown) as Swipeable).close();
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton style={[styles.rightAction, { backgroundColor: color }]} onPress={pressHandler}>
          <AnimatedIcon name={icon} size={30} color="#fff" style={styles.actionIcon} />
        </RectButton>
      </Animated.View>
    );
  };

  return (
    <Swipeable friction={2} /* rightThreshold={120} */ renderRightActions={renderRightActions} ref={updateRef}>
      <RectButton style={[styles.item, style, styles.itemContainer]} onPress={onPress}>
        {/* <TouchableHighlight onPress={onPress} style={[styles.item, style]} underlayColor="#DDDDDD"> */}
        {/* <View style={styles.itemContainer}> */}
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
          {/* </View> */}
        </View>
        {/* </TouchableHighlight> */}
      </RectButton>
      {/*  <TouchableHighlight onPress={onPress} style={[styles.item, style]} underlayColor="#DDDDDD">
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
      </TouchableHighlight> */}
    </Swipeable>
  );
};

export default function WorldScreen() {
  const navigation = useNavigation();
  const { state: appState, actions: appActions } = useAppStore();

  const [serverReq, setServerReq] = useState<IDataFetch>({
    isLoading: false,
    isError: false,
    status: undefined,
  });

  const [controller, setController] = useState(new AbortController());

  const [searchQuery, setSearchQuery] = useState('');

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
    /*     const worldList: IForm = {
      worldList: sortArr({
        arr: appState.data.filter((i) => i.name.toUpperCase().includes(searchQuery.toUpperCase())),
        dir: 'ASC',
        field: 'name',
      }),
    };

    appActions.setForm(worldList); */
  }, [searchQuery, sortArr, appState.data, appActions]);

  useEffect(() => {
    if (!appState.forms) {
    }
    // console.log(Object.keys(appState.forms));
  }, [appState.forms]);

  useEffect(() => {
    if (!serverReq.isError) {
      return;
    }
    setTimeout(() => {
      setServerReq({ isError: false, isLoading: false, status: '' });
    }, 3000);
  }, [serverReq.isError]);

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
      setServerReq({ isError: false, isLoading: false, status: '' });
      setSearchQuery('');
    } catch (err) {
      setServerReq({ isError: true, isLoading: false, status: err.message === 'Aborted' ? 'Отмена' : err.message });
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
                  appActions.updateSort({ direction: 'ASC', field: 'region' });
                  // setState({ ...state, sort: { direction: 'ASC', field: 'region' } });
                },
              },
              {
                title: 'По наименованию',
                onPress: async () => {
                  appActions.updateSort({ direction: 'ASC', field: 'name' });
                  // setState({ ...state, sort: { direction: 'ASC', field: 'name' } });
                },
              },
              {
                title: 'По населению (по убыванию)',
                onPress: async () => {
                  appActions.updateSort({ direction: 'DESC', field: 'population' });
                  // setState({ ...state, sort: { direction: 'DESC', field: 'population' } });
                },
              },
              {
                title: 'По населению (по возрастанию)',
                onPress: async () => {
                  appActions.updateSort({ direction: 'ASC', field: 'population' });
                  // setState({ ...state, sort: { direction: 'ASC', field: 'population' } });
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
  }, [abortRequest, appActions, controller, loadData, navigation, serverReq.isLoading, showActionSheet]);

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
          color={appState.filter ? Colors.red500 : Colors.black}
          size={24}
          style={{ width: 36 }}
          onPress={() => navigation.navigate('Filter')}
        />
      </View>
      <FlatList
        ListEmptyComponent={<Text style={{ flex: 1, textAlign: 'center' }}>Нет данных</Text>}
        refreshControl={<RefreshControl refreshing={serverReq.isLoading} onRefresh={() => loadData()} />}
        data={appState.data /* ((appState.forms?.worldList as unknown) || []) as IData[] */}
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
  actionIcon: {
    marginHorizontal: 10,
    width: 30,
  },
  actionText: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 16,
    padding: 10,
  },
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
  dateText: {
    backgroundColor: 'transparent',
    color: '#999',
    fontWeight: 'bold',
    position: 'absolute',
    right: 20,
    top: 10,
  },
  fab: {
    backgroundColor: Colors.blue600,
    bottom: 0,
    margin: 16,
    position: 'absolute',
    right: 0,
  },
  fromText: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
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
  messageText: {
    backgroundColor: 'transparent',
    color: '#999',
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
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
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
