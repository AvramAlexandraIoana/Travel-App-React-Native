import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

const Loader = () => {
  return (
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>
      <View style={styles.nyoba}>
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.3)',
    zIndex: 5,
  },
  nyoba: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8B0000',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
