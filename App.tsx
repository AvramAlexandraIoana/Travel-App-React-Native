import * as React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native';

const instructions = Platform.select({
  ios: 'IOS',
  android: 'ANDROID',
});

export interface Props { }
export interface State { }

export default class App extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Platforma:
          
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});