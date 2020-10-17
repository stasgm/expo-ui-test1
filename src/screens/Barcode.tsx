import { BarCodeScanner } from 'expo';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

// const { width } = Dimensions.get('window');

export default class BarcodeScreen extends React.Component {
  render() {
    return (
      // eslint-disable-next-line no-alert
      <BarCodeScanner onBarCodeRead={(scan) => alert(scan.data)} style={[StyleSheet.absoluteFill, styles.container]}>
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />
      </BarCodeScanner>
    );
  }
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  focused: {
    flex: 10,
  },
  layerBottom: {
    backgroundColor: opacity,
    flex: 2,
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row',
  },
  layerLeft: {
    backgroundColor: opacity,
    flex: 1,
  },
  layerRight: {
    backgroundColor: opacity,
    flex: 1,
  },
  layerTop: {
    backgroundColor: opacity,
    flex: 2,
  },
});
