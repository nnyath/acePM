import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import Record from'./components/record/record'

export default class acePMClient extends Component {

  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          acePM
        </Text>
        <Record></Record>

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

AppRegistry.registerComponent('acePMClient', () => acePMClient);
