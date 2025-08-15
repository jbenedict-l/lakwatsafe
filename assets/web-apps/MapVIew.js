import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MapView = (props) => (
  <View style={[styles.container, props.style]}>
    <Text style={styles.text}>Map is not available on web</Text>
  </View>
);

const Marker = () => null;

MapView.Marker = Marker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#616161',
  },
});

export default MapView;