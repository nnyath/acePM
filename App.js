import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  
  constructor(props){
    super(props)
    this.buttonTest = this.buttonTest.bind(this)
  }

  buttonTest(){
    console.log('Testing!')
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>acePM</Text>
        <Text>Your feet were made for dancing</Text>
        <Button
          onPress={this.buttonTest}
          title="Begin Recording">
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
