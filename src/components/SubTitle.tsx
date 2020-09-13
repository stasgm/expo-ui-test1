import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

interface IProps {
  children?: unknown;
  style?: ViewStyle;
}

const SubTitle = ({ children, style }: IProps) => {
  return (
    <View style={[styles.titleContainer, style]}>
      <Text style={styles.titleText}>{((children as string) || '').toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 0,
  },
  titleText: {
    color: '#333536',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default SubTitle;
