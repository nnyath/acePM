import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'

import store from './js/store/store'
import Splash from'./js/views/Splash/Splash'
import Main from './js/views/Main/Main'

export default class acePMClient extends Component {

  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <Provider store={store}>
        <Main/>
      </Provider>
    )
  }

}

AppRegistry.registerComponent('acePMClient', () => acePMClient);
