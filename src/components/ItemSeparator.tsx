import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const ItemSeparator = () => {
  const { colors } = useTheme();

  return <View style={[styles.separator, { backgroundColor: colors.border }]} />;
};

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
  },
});

export default ItemSeparator;
