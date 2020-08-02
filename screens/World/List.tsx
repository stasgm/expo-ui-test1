import React, { useRef, useCallback } from 'react';
import { FlatList, Text, View, StyleSheet, StatusBar, SafeAreaView, TouchableHighlight, Platform, RefreshControl, Modal, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { FAB, Searchbar, Colors, Avatar, IconButton, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { IData } from '../../types';

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
        <Avatar.Icon size={32} icon="bookmark-outline" style={{ backgroundColor: Colors.blue600 }} />
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
  animation: any,
}

export default function WorldScreen() {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = React.useState('');

  const [state, setState] = useState<IState>({
    error: null,
    isLoaded: false,
    items: [],
    filteredList: [],
    filter: null,
    animation: new Animated.Value(0),
  })

  const renderItem = ({ item }: { item: IData }) => <Item item={item} onPress={() => { navigation.navigate('Document', { item }) }} />;

  useEffect(() => {
    setState({ ...state, filteredList: state.items.filter(i => i.name.toUpperCase().includes(searchQuery.toUpperCase())) })
  }, [searchQuery])

  const loadData = useCallback(async () => {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const data: IData[] = await res.json();
    setState({ ...state, error: null, isLoaded: true, items: data, filteredList: [], filter: null, });
    setSearchQuery('');
  }, []);

  useEffect(() => { loadData() }, []);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const screenHeight = Dimensions.get("window").height;

  const handleOpen = () => {
    Animated.timing(state.animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleClose = () => {
    Animated.timing(state.animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="rocket"
          size={20}
          onPress={() => handleOpen()}
        />
      ),
    });
  }, [navigation]);

  const slideUp = {
    transform: [
      {
        translateY: state.animation.interpolate({
          inputRange: [0.01, 1],
          outputRange: [0, -1 * screenHeight],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const backdrop = {
    transform: [
      {
        translateY: state.animation.interpolate({
          inputRange: [0, 0.01],
          outputRange: [screenHeight, 0],
          extrapolate: "clamp",
        }),
      },
    ],
    opacity: state.animation.interpolate({
      inputRange: [0.01, 0.5],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
  };

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
          onPress={() => setState({ ...state, filter: { name: 'name' } })}
        />
      </View>
      <FlatList
        ListEmptyComponent={
          !state.isLoaded ? <Text style={{ flex: 1, textAlign: 'center' }}>нет данных</Text> : <View></View>
        }
        refreshControl={
          <RefreshControl
            refreshing={!state.isLoaded}
            onRefresh={() => loadData()}
          />}
        data={searchQuery ? state.filteredList : state.items} renderItem={renderItem}
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
      <Animated.View style={[StyleSheet.absoluteFill, styles.cover, backdrop]}>
        <View style={[styles.sheet]}>
          <Animated.View style={[styles.popup, slideUp]}>
            <TouchableOpacity onPress={handleClose}>
              <Text>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
    </SafeAreaView >
  );
}

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