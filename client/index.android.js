import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import Splash from'./views/Splash/Splash'

export default class acePMClient extends Component {

  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <Splash/>
    );
  }
}

AppRegistry.registerComponent('acePMClient', () => acePMClient);
