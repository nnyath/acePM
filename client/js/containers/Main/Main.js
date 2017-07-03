import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles'
import {_wait} from '../../util/tests/testutil'
import Splash from '../Splash/Splash'
import Record from '../Record/Record'

@connect(store => {
  return {
    initLoad : store.main.init
  }
})
export default class Main extends Component {

  constructor() {
    super()
    this.state = {}
  }

  componentDidMount(){}

  render() {

    const { initLoad } = this.props

    return (
        <View style={styles.container}>
            {initLoad ? (<Record/>) : (<Splash/>)}
        </View>
    )
  }
}

